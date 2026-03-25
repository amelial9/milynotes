import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
// Config runs before Vite injects .env files into process.env — use loadEnv so
// web/.env.production (VITE_BASE_PATH) is respected. Shell-exported VITE_BASE_PATH (CI) wins.
export default defineConfig(({ command, mode }) => {
  const fileEnv = loadEnv(mode, process.cwd(), '')
  const base =
    process.env.VITE_BASE_PATH ||
    fileEnv.VITE_BASE_PATH ||
    (command === 'build' ? './' : '/')

  return {
    base,
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
  }
})
