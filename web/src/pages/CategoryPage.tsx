import { Link, Navigate, useParams } from 'react-router-dom'
import { getCategoryById } from '../categories'
import { listNotesForVaultFolder, noteViewPath } from '../lib/notesIndex'

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = categoryId ? getCategoryById(categoryId) : undefined

  if (!category) {
    return <Navigate to="/" replace />
  }

  const notes = listNotesForVaultFolder(category.vaultFolder)

  return (
    <section className="category-detail" aria-labelledby="category-title">
      <h1 id="category-title" className="category-detail__title">
        Category: {category.name}
      </h1>
      <ul className="category-detail__list">
        {notes.map((n) => (
          <li key={n.relativePath} className="category-detail__row">
            <Link
              to={noteViewPath(category.id, n.relativePath)}
              className="category-detail__link"
            >
              {n.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
