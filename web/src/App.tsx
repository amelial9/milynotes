import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import NotePage from './pages/NotePage'
import './App.css'

function routerBasename(): string | undefined {
  const raw = import.meta.env.BASE_URL
  if (raw !== './' && raw !== '/') {
    return raw.replace(/\/$/, '') || undefined
  }
  // Relative production base: custom domain is at /; GitHub project pages are /repo/...
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
    const first = window.location.pathname.split('/').filter(Boolean)[0]
    if (first) return `/${first}`
  }
  return undefined
}

export default function App() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId/note/:notePath" element={<NotePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
