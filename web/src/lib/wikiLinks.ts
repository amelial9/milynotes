import { CATEGORIES } from '../categories'
import { listNotesForVaultFolder, noteViewPath } from './notesIndex'
import { normalizeRelPath } from './parseNoteFile'

/** GitHub-style heading slug; used for both heading ids and `[[note#heading]]` anchors. */
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
}

type NoteTarget = { categoryId: string; relativePath: string }

function stripMd(p: string): string {
  return p.replace(/\.md$/i, '')
}

/**
 * Resolve an Obsidian link target (`Note`, `folder/Note`) to a site note.
 * Prefers notes in the current vault folder, then any category.
 */
function resolveNote(currentVaultFolder: string, target: string): NoteTarget | null {
  const want = stripMd(normalizeRelPath(target.trim())).toLowerCase()
  if (!want) return null
  const ordered = [
    ...CATEGORIES.filter((c) => c.vaultFolder === currentVaultFolder),
    ...CATEGORIES.filter((c) => c.vaultFolder !== currentVaultFolder),
  ]
  for (const category of ordered) {
    for (const n of listNotesForVaultFolder(category.vaultFolder)) {
      const rel = stripMd(normalizeRelPath(n.relativePath)).toLowerCase()
      if (rel === want || rel.endsWith(`/${want}`)) {
        return { categoryId: category.id, relativePath: normalizeRelPath(n.relativePath) }
      }
    }
  }
  return null
}

function escapeLinkText(s: string): string {
  return s.replace(/([[\]\\])/g, '\\$1')
}

function convertSegment(text: string, vaultFolder: string): string {
  return text.replace(/(?<!!)\[\[([^\]\n]+)\]\]/g, (full, inner: string) => {
    const pipe = inner.indexOf('|')
    const ref = pipe === -1 ? inner : inner.slice(0, pipe)
    const alias = pipe === -1 ? '' : inner.slice(pipe + 1).trim()
    const hashAt = ref.indexOf('#')
    const notePart = hashAt === -1 ? ref : ref.slice(0, hashAt)
    const heading = hashAt === -1 ? '' : ref.slice(hashAt + 1).replace(/^\^/, '').trim()
    const label = alias || (notePart.trim() ? stripMd(notePart.trim()) : heading)

    const anchor = heading ? `#${slugifyHeading(heading.split('#').pop() ?? heading)}` : ''
    if (!notePart.trim()) {
      return anchor ? `[${escapeLinkText(label)}](${anchor})` : full
    }
    const note = resolveNote(vaultFolder, notePart)
    if (!note) return escapeLinkText(label)
    return `[${escapeLinkText(label)}](<${noteViewPath(note.categoryId, note.relativePath)}${anchor}>)`
  })
}

/** Convert Obsidian `[[note#heading|alias]]` links to markdown links to site routes (skips code). */
export function convertWikiLinks(body: string, vaultFolder: string): string {
  return body
    .split(/(```[\s\S]*?```|`[^`\n]*`)/g)
    .map((segment) => (segment.startsWith('`') ? segment : convertSegment(segment, vaultFolder)))
    .join('')
}
