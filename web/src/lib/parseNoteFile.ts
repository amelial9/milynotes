export type ParsedNote = {
  title: string
  order: number
  /** Relative path under the vault folder, e.g. `01_basic sql/JOINs.md` */
  relativePath: string
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

export function parseOrderFromRaw(raw: string): number | undefined {
  const m = raw.match(FRONTMATTER)
  if (!m) return undefined
  const orderLine = /^order:\s*(\d+)\s*$/m.exec(m[1])
  if (!orderLine) return undefined
  return Number.parseInt(orderLine[1], 10)
}

export function titleFromPathKey(pathKey: string): string {
  const base = pathKey.split(/[/\\]/).pop() ?? pathKey
  return base.replace(/\.md$/i, '')
}

export function stripFrontmatter(raw: string): string {
  const m = raw.match(FRONTMATTER)
  if (!m) return raw
  return raw.slice(m[0].length)
}

export function normalizeRelPath(p: string): string {
  return p.replace(/\\/g, '/').replace(/\/+/g, '/')
}
