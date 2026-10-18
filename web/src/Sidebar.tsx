import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CATEGORIES } from './categories'
import { listNotesForVaultFolder, noteViewPath } from './lib/notesIndex'

const NOTES_BY_CATEGORY = new Map(
  CATEGORIES.map((c) => [c.id, listNotesForVaultFolder(c.vaultFolder)] as const),
)

function activeCategoryId(pathname: string): string | undefined {
  const m = /^\/category\/([^/]+)/.exec(pathname)
  return m ? decodeURIComponent(m[1]) : undefined
}

export default function Sidebar() {
  const { pathname } = useLocation()
  const current = activeCategoryId(pathname)
  // Manual expand/collapse; otherwise only the category you're in is expanded.
  const [overrides, setOverrides] = useState<Record<string, boolean>>({})
  const isExpanded = (id: string) => overrides[id] ?? id === current
  const toggle = (id: string) => setOverrides((prev) => ({ ...prev, [id]: !isExpanded(id) }))

  return (
    <nav className="sidebar" aria-label="Notes">
      <p className="sidebar__heading">Categories</p>
      <ul className="sidebar__list">
        {CATEGORIES.map((c) => {
          const notes = NOTES_BY_CATEGORY.get(c.id) ?? []
          const isOpen = isExpanded(c.id)
          return (
            <li key={c.id} className="sidebar__group">
              <div className="sidebar__group-row">
                <NavLink to={`/category/${c.id}`} end className="sidebar__category">
                  {c.name}
                </NavLink>
                {notes.length > 0 ? (
                  <button
                    type="button"
                    className="sidebar__toggle"
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${c.name}`}
                    onClick={() => toggle(c.id)}
                  >
                    <svg width={12} height={12} viewBox="0 0 12 12" aria-hidden={true}>
                      <path
                        d="M4.5 2.5 8 6l-3.5 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : null}
              </div>
              {isOpen ? (
                <ul className="sidebar__notes">
                  {notes.map((n) => {
                    const to = noteViewPath(c.id, n.relativePath)
                    return (
                      <li key={n.relativePath}>
                        <Link
                          to={to}
                          className="sidebar__note"
                          aria-current={pathname === to ? 'page' : undefined}
                        >
                          {n.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
