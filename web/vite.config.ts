import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
// Production default is relative (./) so the same build works on a custom domain at the site
// root and on GitHub project pages. Override with VITE_BASE_PATH if needed.
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
