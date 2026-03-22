/**
 * Markdown collapses 3+ newlines between blocks similarly to \n\n, so extra blank
 * lines in the editor disappear. Replace runs of 3+ newlines (outside ``` fences) with
 * explicit spacer divs so the rendered page keeps the same number of "empty line" gaps.
 *
 * \n\n     = one paragraph break (unchanged)
 * \n\n\n   = paragraph break + 1 extra blank line in source → 1 spacer
 * \n\n\n\n = +2 extra blank lines → 2 spacers
 * Pattern: n consecutive newlines → (n - 2) spacer divs for n >= 3
 */
export function preserveExtraBlankLinesOutsideCode(body: string): string {
  const normalized = body.replace(/\r\n/g, '\n')
  const segments = normalized.split(/(```[\s\S]*?```)/g)
  return segments
    .map((segment) => {
      if (segment.startsWith('```')) return segment
      return segment.replace(/\n{3,}/g, (run) => {
        const n = run.length
        const extra = n - 2
        if (extra <= 0) return '\n\n'
        const spacers = '<div class="md-blank-line"></div>\n'.repeat(extra).trimEnd()
        return `\n\n${spacers}\n\n`
      })
    })
    .join('')
}
