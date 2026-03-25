import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
// CI usually sets VITE_BASE_PATH=/<repo>/ for https://user.github.io/repo/. If you use a
// custom domain or a user-site URL at the domain root, set VITE_BASE_PATH=/ or the browser
// will request /repo/assets/... while files live at /assets/... (white page + 404s).
// A relative base (`./`) breaks `${BASE_URL}…` after client-side navigation to deep routes.
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
