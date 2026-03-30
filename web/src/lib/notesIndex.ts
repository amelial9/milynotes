import { CATEGORIES } from '../categories'
import type { ParsedNote } from './parseNoteFile'
import {
  normalizeRelPath,
  parseOrderFromRaw,
  stripFrontmatter,
  titleFromPathKey,
} from './parseNoteFile'

const rawModules = import.meta.glob('../../../milynotes vault/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const VAULT_FOLDERS = [
  'INFO 330',
  'DSA',
  'INFO 441',
  'INFO 449',
  'CSE 444',
] as const

function vaultRelativePath(globKey: string, vaultFolder: string): string | null {
  const normalized = globKey.replace(/\\/g, '/')
  const needle = `milynotes vault/${vaultFolder}/`
  const i = normalized.lastIndexOf(needle)
  if (i === -1) return null
  return normalized.slice(i + needle.length)
}

const rawByVaultAndRel = new Map<string, string>()
for (const [globKey, raw] of Object.entries(rawModules)) {
  for (const folder of VAULT_FOLDERS) {
    const rel = vaultRelativePath(globKey, folder)
    if (rel) {
      rawByVaultAndRel.set(`${folder}::${normalizeRelPath(rel)}`, raw)
      break
    }
  }
}

export function getNoteRaw(vaultFolder: string, relativePath: string): string | null {
  const key = `${vaultFolder}::${normalizeRelPath(relativePath)}`
  return rawByVaultAndRel.get(key) ?? null
}

export function noteViewPath(categoryId: string, relativePath: string): string {
  return `/category/${encodeURIComponent(categoryId)}/note/${encodeURIComponent(relativePath)}`
}

export function listNotesForVaultFolder(vaultFolder: string): ParsedNote[] {
  const out: ParsedNote[] = []

  for (const [pathKey, raw] of Object.entries(rawModules)) {
    const relativePath = vaultRelativePath(pathKey, vaultFolder)
    if (relativePath === null) continue

    const order = parseOrderFromRaw(raw)
    if (order === undefined) continue

    out.push({
      title: titleFromPathKey(relativePath),
      order,
      relativePath,
    })
  }

  out.sort((a, b) => a.order - b.order)
  return out
}

export type SearchHit = {
  categoryId: string
  categoryName: string
  relativePath: string
  title: string
}

const categoryByVaultFolder = new Map(
  CATEGORIES.map((c) => [c.vaultFolder, c] as const),
)

/**
 * Case-insensitive search over note title, path, and body (frontmatter stripped).
 * Only includes files that declare `order:` in YAML frontmatter (same as category listings).
 * All whitespace-separated terms must match.
 */
export function searchNotes(query: string, limit = 40): SearchHit[] {
  const trimmed = query.trim().toLowerCase()
  if (trimmed.length < 2) return []

  const terms = trimmed.split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  const hits: SearchHit[] = []

  outer: for (const [globKey, raw] of Object.entries(rawModules)) {
    let vaultFolder: (typeof VAULT_FOLDERS)[number] | null = null
    let relativePath: string | null = null

    for (const folder of VAULT_FOLDERS) {
      const rel = vaultRelativePath(globKey, folder)
      if (rel !== null) {
        vaultFolder = folder
        relativePath = rel
        break
      }
    }

    if (!vaultFolder || relativePath === null) continue

    const category = categoryByVaultFolder.get(vaultFolder)
    if (!category) continue

    if (parseOrderFromRaw(raw) === undefined) continue

    const title = titleFromPathKey(relativePath)
    const normPath = normalizeRelPath(relativePath)
    const body = stripFrontmatter(raw)
    const haystack = `${title}\n${normPath}\n${body}`.toLowerCase()

    if (!terms.every((t) => haystack.includes(t))) continue

    hits.push({
      categoryId: category.id,
      categoryName: category.name,
      relativePath: normPath,
      title,
    })

    if (hits.length >= limit) break outer
  }

  hits.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))
  return hits
}
