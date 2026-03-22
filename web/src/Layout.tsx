import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
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
          <label className="nav__search" aria-label="Search">
            <input type="search" placeholder="Search…" autoComplete="off" />
          </label>
          <button type="button" className="nav__search-btn" aria-label="Search">
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
      </header>

      <main className="wrap">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Amelia Li</p>
      </footer>
    </div>
  )
}
