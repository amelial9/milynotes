const imageModules = import.meta.glob('../../../milynotes vault/**/*.{png,jpg,jpeg,gif,webp,svg}', {
  eager: true,
  as: 'url',
}) as Record<string, string>

/** Vault-relative path after `milynotes vault/`, e.g. `INFO 330/05_relational schema/img/fk.png` */
const urlByVaultRelPath = new Map<string, string>()

for (const [globKey, url] of Object.entries(imageModules)) {
  const normalized = globKey.replace(/\\/g, '/')
  const needle = 'milynotes vault/'
  const i = normalized.lastIndexOf(needle)
  if (i === -1) continue
  const rel = normalized.slice(i + needle.length)
  urlByVaultRelPath.set(rel, url)
}

function parentDir(noteRelativePath: string): string {
  const i = noteRelativePath.lastIndexOf('/')
  if (i === -1) return ''
  return noteRelativePath.slice(0, i)
}

/**
 * Resolve Obsidian wiki image names and relative markdown image paths to Vite asset URLs.
 */
export function resolveVaultImageUrl(
  vaultFolder: string,
  noteRelativePath: string,
  ref: string,
): string | null {
  const trimmed = ref.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed

  const noteDir = parentDir(noteRelativePath)
  const clean = trimmed.replace(/^\.\//, '').replace(/^\/+/, '')

  const candidates: string[] = []

  if (clean.includes('/')) {
    candidates.push(`${vaultFolder}/${clean}`)
  }

  if (noteDir) {
    candidates.push(`${vaultFolder}/${noteDir}/img/${clean}`)
    candidates.push(`${vaultFolder}/${noteDir}/${clean}`)
  } else {
    candidates.push(`${vaultFolder}/img/${clean}`)
    candidates.push(`${vaultFolder}/${clean}`)
  }

  const baseName = clean.split('/').pop() ?? clean
  if (noteDir && baseName !== clean) {
    candidates.push(`${vaultFolder}/${noteDir}/img/${baseName}`)
  }

  const seen = new Set<string>()
  for (const c of candidates) {
    if (seen.has(c)) continue
    seen.add(c)
    const u = urlByVaultRelPath.get(c)
    if (u) return u
  }

  return null
}

/**
 * Convert Obsidian-style `![[file]]` / `![[file|caption]]` and fix relative `![](...)` paths.
 */
export function preprocessVaultMarkdown(
  body: string,
  vaultFolder: string,
  noteRelativePath: string,
): string {
  let out = body

  out = out.replace(/!\[\[([^\]]+)\]\]/g, (full, inner: string) => {
    const target = inner.split('|')[0].trim()
    if (!target) return full
    const url = resolveVaultImageUrl(vaultFolder, noteRelativePath, target)
    if (!url) return full
    const alt = target.replace(/\.[^./\\]+$/, '').replace(/[/_-]+/g, ' ')
    return `![${alt}](${url})`
  })

  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (full, alt, src: string) => {
    const s = src.trim()
    if (/^https?:\/\//i.test(s)) return full
    const url = resolveVaultImageUrl(vaultFolder, noteRelativePath, s)
    if (!url) return full
    return `![${alt}](${url})`
  })

  return out
}
