import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { noteViewPath, searchNotes } from './lib/notesIndex'

export default function Layout() {
  const { pathname } = useLocation()
  const [query, setQuery] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const hits = useMemo(() => searchNotes(query), [query])
  const trimmed = query.trim()
  const canSearch = trimmed.length >= 2
  const showResults = panelOpen && canSearch

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    setMobileSearchOpen(false)
    setPanelOpen(false)
  }, [pathname])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setPanelOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    if (!mobileSearchOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileSearchOpen])

  const openMobileSearch = () => {
    setMobileSearchOpen(true)
    setPanelOpen(true)
  }

  const resultList = (
    <ul
      className="nav__search-results"
      id="nav-search-results"
      role="listbox"
      aria-label="Search results"
      hidden={!showResults}
    >
      {canSearch && hits.length === 0 ? (
        <li className="nav__search-empty" role="option">
          No notes match.
        </li>
      ) : (
        hits.map((h) => (
          <li key={`${h.categoryId}::${h.relativePath}`} role="option">
            <Link
              className="nav__search-hit"
              to={noteViewPath(h.categoryId, h.relativePath)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setPanelOpen(false)
                setMobileSearchOpen(false)
              }}
            >
              <span className="nav__search-hit-title">{h.title}</span>
              <span className="nav__search-hit-meta">{h.categoryName}</span>
            </Link>
          </li>
        ))
      )}
    </ul>
  )

  return (
    <div className="layout">
      <header className="nav">
        <div className="nav__inner">
          <div className="nav__title-group">
            <img
              className="nav__portrait"
              src="/portrait.svg"
              width={40}
              height={40}
              alt=""
            />
            <h1 className="nav__brand">
              <Link to="/" className="nav__brand-link">
                Amelia&apos;s Notes & Brain Dump.
              </Link>
            </h1>
          </div>
          <div className="nav__search-wrap" ref={wrapRef}>
            <label className="nav__search nav__search--desktop" aria-label="Search">
              <input
                type="search"
                placeholder="Search…"
                autoComplete="off"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPanelOpen(true)
                }}
                onFocus={() => setPanelOpen(true)}
                aria-autocomplete="list"
                aria-controls="nav-search-results"
                aria-expanded={showResults}
              />
              {resultList}
            </label>
            <button
              type="button"
              className="nav__search-btn"
              aria-label="Open search"
              onClick={openMobileSearch}
            >
              <svg
                className="nav__search-btn-icon"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                aria-hidden={true}
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M16.2 16.2 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileSearchOpen ? (
        <div
          className="nav__search-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Search notes"
        >
          <button
            type="button"
            className="nav__search-mobile-backdrop"
            aria-label="Close search"
            onClick={() => setMobileSearchOpen(false)}
          />
          <div className="nav__search-mobile-panel">
            <label className="nav__search nav__search--mobile-field" aria-label="Search">
              <input
                type="search"
                placeholder="Search…"
                autoComplete="off"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPanelOpen(true)
                }}
                onFocus={() => setPanelOpen(true)}
                aria-autocomplete="list"
                aria-controls="nav-search-results-mobile"
                aria-expanded={showResults}
                autoFocus
              />
            </label>
            <ul
              className="nav__search-results nav__search-results--mobile"
              id="nav-search-results-mobile"
              role="listbox"
              aria-label="Search results"
            >
              {canSearch && hits.length === 0 ? (
                <li className="nav__search-empty" role="option">
                  No notes match.
                </li>
              ) : (
                hits.map((h) => (
                  <li key={`m-${h.categoryId}::${h.relativePath}`} role="option">
                    <Link
                      className="nav__search-hit"
                      to={noteViewPath(h.categoryId, h.relativePath)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setPanelOpen(false)
                        setMobileSearchOpen(false)
                      }}
                    >
                      <span className="nav__search-hit-title">{h.title}</span>
                      <span className="nav__search-hit-meta">{h.categoryName}</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}

      <main className="wrap">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Amelia Li</p>
      </footer>
    </div>
  )
}
