import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import NotePage from './pages/NotePage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
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
