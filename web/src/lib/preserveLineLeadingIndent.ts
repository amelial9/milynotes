const NBSP_PER_TAB = 4
const LIST_ITEM = /^\s*([-*+]|\d+[.)])\s/

/**
 * Markdown/HTML collapse normal spaces; leading tabs on a line are often stripped or merged.
 * Replace leading tabs with non-breaking spaces (outside fenced ``` blocks) so indentation
 * matches Obsidian-style notes. Optional `>` blockquote prefix is handled.
 */
export function preserveLeadingTabsOutsideCode(body: string): string {
  const lines = body.split(/\r?\n/)
  let inFence = false
  let inList = false
  const out: string[] = []

  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence
      inList = false
      out.push(line)
      continue
    }
    if (inFence) {
      out.push(line)
      continue
    }

    const isListItem = LIST_ITEM.test(line)
    if (inList && !isListItem && /^\S/.test(line)) {
      // Markdown would fold an unindented line into the list item above ("lazy continuation");
      // Obsidian shows it as its own line at the left margin. An HTML comment closes the list.
      out.push('<!---->')
    }
    if (isListItem) inList = true
    else if (!line.trim() || /^\S/.test(line)) inList = false

    out.push(transformIndentedLine(line))
  }

  return out.join('\n')
}

function transformIndentedLine(line: string): string {
  // Whitespace-only lines are blank lines; tab-indented list items must keep their tabs to nest.
  if (!line.trim()) return ''
  if (/^\t+([-*+]|\d+[.)])\s/.test(line)) return line

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
