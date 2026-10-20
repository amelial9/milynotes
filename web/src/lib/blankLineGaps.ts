type Point = { line: number }
type MdNode = {
  type: string
  value?: string
  position?: { start: Point; end: Point }
  children?: MdNode[]
  data?: { hProperties?: Record<string, unknown> }
}

function gapStyle(blankLines: number): string {
  return `margin-top: calc(${blankLines} * var(--note-line))`
}

function applyGaps(parent: MdNode) {
  const children = parent.children
  if (!children) return
  for (let i = 0; i < children.length; i++) {
    const node = children[i]
    applyGaps(node)
    if (i === 0) continue
    const prev = children[i - 1]
    if (!prev.position || !node.position) continue
    const blankLines = node.position.start.line - prev.position.end.line - 1
    if (blankLines <= 0) continue

    if (node.type === 'html') {
      node.value = `<div style="${gapStyle(blankLines)}"></div>\n${node.value ?? ''}`
      continue
    }
    node.data = node.data ?? {}
    const props = (node.data.hProperties = node.data.hProperties ?? {})
    props.style = gapStyle(blankLines)
  }
}

/**
 * Obsidian shows every empty line in the source as an empty line on screen. Markdown instead
 * collapses any run of blank lines into one block break, so this remark plugin measures how many
 * blank lines sit between sibling blocks (paragraphs, headings, list items, …) and turns that into
 * a top margin of that many text lines. Block margins in CSS are zero so the gap is exactly that.
 */
export default function remarkBlankLineGaps() {
  return (tree: MdNode) => applyGaps(tree)
}
