import { Link } from 'react-router-dom'
import { listRecentNotes, noteViewPath } from '../lib/notesIndex'

const RECENT_COUNT = 12

const dateFormat = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export default function Home() {
  const notes = listRecentNotes(RECENT_COUNT)

  return (
    <section className="recent" aria-labelledby="recent-heading">
      <h2 id="recent-heading" className="recent__heading">
        Recently added
      </h2>
      <ul className="recent__list">
        {notes.map((n) => (
          <li key={`${n.categoryId}::${n.relativePath}`} className="recent__row">
            <Link to={noteViewPath(n.categoryId, n.relativePath)} className="recent__link">
              <span className="recent__title">{n.title}</span>
              <span className="recent__meta">
                <span>{n.categoryName}</span>
                <time dateTime={n.added.toISOString()}>{dateFormat.format(n.added)}</time>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
