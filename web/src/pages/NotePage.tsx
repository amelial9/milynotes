import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getCategoryById } from '../categories'
import { getNoteRaw } from '../lib/notesIndex'
import { preserveExtraBlankLinesOutsideCode } from '../lib/preserveExtraBlankLines'
import { preserveLeadingTabsOutsideCode } from '../lib/preserveLineLeadingIndent'
import { preprocessVaultMarkdown } from '../lib/vaultImages'
import { stripFrontmatter, titleFromPathKey } from '../lib/parseNoteFile'

function decodePathParam(param: string | undefined): string {
  if (!param) return ''
  try {
    return decodeURIComponent(param)
  } catch {
    return param
  }
}

export default function NotePage() {
  const { categoryId, notePath } = useParams<{
    categoryId: string
    notePath: string
  }>()
  const category = categoryId ? getCategoryById(categoryId) : undefined

  if (!categoryId) {
    return <Navigate to="/" replace />
  }

  if (!category) {
    return <Navigate to="/" replace />
  }

  const decodedPath = decodePathParam(notePath)
  const raw =
    decodedPath.length > 0 ? getNoteRaw(category.vaultFolder, decodedPath) : null

  if (!raw) {
    return <Navigate to={`/category/${encodeURIComponent(categoryId)}`} replace />
  }

  const title = titleFromPathKey(decodedPath)
  const body = preserveExtraBlankLinesOutsideCode(
    preserveLeadingTabsOutsideCode(
      preprocessVaultMarkdown(
        stripFrontmatter(raw),
        category.vaultFolder,
        decodedPath,
      ),
    ),
  )

  return (
    <article className="note-view">
      <Link
        to={`/category/${encodeURIComponent(categoryId)}`}
        className="note-view__back"
      >
        ← {category.name}
      </Link>
      <h1 className="note-view__title">{title}</h1>
      <div className="note-view__body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
          rehypePlugins={[[rehypeKatex, { strict: false }], rehypeRaw]}
        >
          {body}
        </ReactMarkdown>
      </div>
    </article>
  )
}
