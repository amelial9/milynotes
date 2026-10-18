import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

// Exposes `virtual:note-dates`: { "<vault folder>/<relative path>.md": ISO date } with when
// each note was first added, so the home page can list the newest notes.
// Date = commit that added the file (followed through renames); untracked files use their
// creation time. CI needs full history for this (`fetch-depth: 0` on checkout).

const VIRTUAL_ID = 'virtual:note-dates'
const RESOLVED_ID = `\0${VIRTUAL_ID}`
const REPO_DIR = path.resolve(__dirname, '..')
const VAULT_NAME = 'milynotes vault'
const VAULT_DIR = path.join(REPO_DIR, VAULT_NAME)

function git(args: string[]): string {
  try {
    return execFileSync('git', ['-c', 'core.quotepath=off', ...args], {
      cwd: REPO_DIR,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    })
  } catch {
    return ''
  }
}

function listMarkdown(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.')) return []
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return listMarkdown(full)
    return entry.name.toLowerCase().endsWith('.md') ? [full] : []
  })
}

export function buildNoteDates(): Record<string, string> {
  const prefix = `${VAULT_NAME}/`

  // Oldest commit first: record each add, and carry the date along when a file is renamed.
  const added = new Map<string, string>()
  let date = ''
  const log = git(['log', '--reverse', '-M', '--format=@%cI', '--name-status', '--', VAULT_NAME])
  for (const line of log.split('\n')) {
    if (line.startsWith('@')) {
      date = line.slice(1)
      continue
    }
    const [status, from, to] = line.split('\t')
    if (status === 'A' && !added.has(from)) added.set(from, date)
    else if (status?.startsWith('R') && to) added.set(to, added.get(from) ?? date)
  }

  const out: Record<string, string> = {}
  for (const file of listMarkdown(VAULT_DIR)) {
    const repoRel = path.relative(REPO_DIR, file).split(path.sep).join('/')
    out[repoRel.slice(prefix.length)] =
      added.get(repoRel) ?? fs.statSync(file).birthtime.toISOString()
  }
  return out
}

export function noteDates(): Plugin {
  return {
    name: 'note-dates',
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined
    },
    load(id) {
      if (id !== RESOLVED_ID) return undefined
      return `export default ${JSON.stringify(buildNoteDates())}`
    },
  }
}
