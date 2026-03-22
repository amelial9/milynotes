import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
// Production default is relative (./) so the same build works on a custom domain at the site
// root (e.g. notes.example.com/assets/...) and on GitHub project pages
// (user.github.io/repo/assets/...). Override with VITE_BASE_PATH if needed.
export default defineConfig(({ mode }) => ({
  base:
    process.env.VITE_BASE_PATH ??
    (mode === 'development' ? '/' : './'),
  plugins: [react()],
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
}))
