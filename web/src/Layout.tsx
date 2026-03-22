import { Outlet, useLocation } from 'react-router-dom'

/** Category list + note pages: narrower column for reading */
function useReadingLayout(): boolean {
  const { pathname } = useLocation()
  return pathname.startsWith('/category')
}

export default function Layout() {
  const reading = useReadingLayout()

  return (
    <div className={`layout${reading ? ' layout--reading' : ''}`}>
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
            <h1 className="nav__brand">Amelia&apos;s Notes & Brain Dump.</h1>
          </div>
          <label className="nav__search" aria-label="Search">
            <input type="search" placeholder="Search…" autoComplete="off" />
          </label>
          <button type="button" className="nav__search-btn" aria-label="Search">
            🔍
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
