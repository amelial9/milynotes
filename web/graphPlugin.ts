import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { CATEGORIES } from './src/categories'

// Builds graph.json (notes + [[wikilinks]] between them) so other sites can draw a
// graph view of the vault. Served in dev at /graph.json and emitted into dist on build.

type GraphNode = {
  id: string
  title: string
  categoryId: string
  categoryName: string
  /** Path on this site, e.g. `/category/sql-notes/note/01_basic%20sql%2FJOINs.md` */
  url: string
}

type GraphLink = { source: string; target: string }

const VAULT_DIR = path.resolve(__dirname, '../milynotes vault')
/** Vault folders left out of the graph (they stay on the notes site). */
const EXCLUDED_FOLDERS = new Set(['DSA'])
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

function listMarkdown(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.')) return []
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return listMarkdown(full)
    return entry.name.toLowerCase().endsWith('.md') ? [full] : []
  })
}

function hasOrder(raw: string): boolean {
  const m = raw.match(FRONTMATTER)
  return !!m && /^order:\s*\d+\s*$/m.test(m[1])
}

/** Drop fenced and inline code so `[[...]]` inside code samples isn't read as a link. */
function stripCode(raw: string): string {
  return raw.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '').replace(/`[^`\n]*`/g, '')
}

/** Wikilink targets (no embeds), with `|alias`, `#heading` and `^block` removed. */
function wikilinkTargets(raw: string): string[] {
  const out: string[] = []
  for (const m of stripCode(raw).matchAll(/(!?)\[\[([^\]\n]+)\]\]/g)) {
    if (m[1]) continue
    // Inside tables the alias pipe is escaped as `\|`.
    const target = m[2].split('|')[0].replace(/\\$/, '').split('#')[0].split('^')[0].trim()
    if (target) out.push(target)
  }
  return out
}

export function buildGraph(): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodes: GraphNode[] = []
  const bodies = new Map<string, string>()

  for (const category of CATEGORIES) {
    if (EXCLUDED_FOLDERS.has(category.vaultFolder)) continue
    const folderDir = path.join(VAULT_DIR, category.vaultFolder)
    for (const file of listMarkdown(folderDir)) {
      const raw = fs.readFileSync(file, 'utf8')
      if (!hasOrder(raw)) continue
      const relativePath = path.relative(folderDir, file).split(path.sep).join('/')
      const id = `${category.vaultFolder}/${relativePath}`
      nodes.push({
        id,
        title: path.basename(file, path.extname(file)),
        categoryId: category.id,
        categoryName: category.name,
        url: `/category/${encodeURIComponent(category.id)}/note/${encodeURIComponent(relativePath)}`,
      })
      bodies.set(id, raw)
    }
  }

  // Obsidian resolves [[Name]] by file name, or by path when one is given.
  const byName = new Map<string, GraphNode[]>()
  const byPath = new Map<string, GraphNode>()
  for (const node of nodes) {
    const name = node.title.toLowerCase()
    byName.set(name, [...(byName.get(name) ?? []), node])
    byPath.set(node.id.replace(/\.md$/i, '').toLowerCase(), node)
  }

  function resolve(target: string, from: GraphNode): GraphNode | undefined {
    const key = target.replace(/\.md$/i, '').toLowerCase()
    if (key.includes('/')) {
      const exact = byPath.get(key)
      if (exact) return exact
      for (const [p, node] of byPath) if (p.endsWith(`/${key}`)) return node
    }
    const candidates = byName.get(key.split('/').pop() ?? key) ?? []
    // Same name in several courses: prefer the one in the linking note's course.
    return candidates.find((c) => c.categoryId === from.categoryId) ?? candidates[0]
  }

  const seen = new Set<string>()
  const links: GraphLink[] = []
  for (const node of nodes) {
    for (const target of wikilinkTargets(bodies.get(node.id) ?? '')) {
      const to = resolve(target, node)
      if (!to || to.id === node.id) continue
      // Obsidian draws one line per pair, whichever direction the link goes.
      const key = [node.id, to.id].sort().join('\u0000')
      if (seen.has(key)) continue
      seen.add(key)
      links.push({ source: node.id, target: to.id })
    }
  }

  return { nodes, links }
}

export function notesGraph(): Plugin {
  return {
    name: 'notes-graph',
    configureServer(server) {
      server.middlewares.use('/graph.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.end(JSON.stringify(buildGraph()))
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'graph.json', source: JSON.stringify(buildGraph()) })
    },
  }
}
