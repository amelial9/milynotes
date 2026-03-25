import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
// For GitHub project Pages (`/repo/`), CI sets VITE_BASE_PATH=/<repo>/ so asset and
// public URLs are root-absolute (e.g. /milynotes/portrait.svg). A relative base (`./`)
// breaks those URLs after client-side navigation to deep routes (browser resolves `./`
// against the current path). Local `npm run build` without VITE_BASE_PATH still uses `./`.
export default defineConfig(({ command }) => ({
  base:
    process.env.VITE_BASE_PATH ||
    (command === 'build' ? './' : '/'),
  plugins: [
    react(),
    {
      name: 'build-sha-marker',
      transformIndexHtml(html) {
        const sha = process.env.GITHUB_SHA
        const marker = sha
          ? `<!-- build-sha:${sha.slice(0, 7)} -->`
          : '<!-- build-sha:local -->'
        return html.replace('<head>', `<head>\n    ${marker}`)
      },
    },
  ],
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
}))
