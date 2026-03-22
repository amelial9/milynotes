import type { ParsedNote } from './parseNoteFile'
import {
  normalizeRelPath,
  parseOrderFromRaw,
  titleFromPathKey,
} from './parseNoteFile'

const rawModules = import.meta.glob('../../../milynotes vault/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const VAULT_FOLDERS = ['INFO 330', 'DSA', 'INFO 441', 'INFO 449'] as const

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
