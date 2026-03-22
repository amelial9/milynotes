const NBSP_PER_TAB = 4

/**
 * Markdown/HTML collapse normal spaces; leading tabs on a line are often stripped or merged.
 * Replace leading tabs with non-breaking spaces (outside fenced ``` blocks) so indentation
 * matches Obsidian-style notes. Optional `>` blockquote prefix is handled.
 */
export function preserveLeadingTabsOutsideCode(body: string): string {
  const lines = body.split(/\r?\n/)
  let inFence = false
  const out: string[] = []

  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence
      out.push(line)
      continue
    }
    if (inFence) {
      out.push(line)
      continue
    }
    out.push(transformIndentedLine(line))
  }

  return out.join('\n')
}

function transformIndentedLine(line: string): string {
  const quoted = line.match(/^(> ?\s*)(\t+)(.*)$/)
  if (quoted) {
    const pad = '\u00a0'.repeat(quoted[2].length * NBSP_PER_TAB)
    return quoted[1] + pad + quoted[3]
  }

  const plain = line.match(/^(\t+)(.*)$/)
  if (plain) {
    return '\u00a0'.repeat(plain[1].length * NBSP_PER_TAB) + plain[2]
  }

  return line
}
