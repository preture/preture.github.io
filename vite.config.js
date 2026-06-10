import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'css-before-script',
      closeBundle() {
        const htmlPath = resolve(__dirname, 'dist/index.html')
        const html = readFileSync(htmlPath, 'utf-8')
        const re = /(<script[^>]*>\s*<\/script>)(\s*)(<link rel="stylesheet"[^>]*>)/g
        if (re.test(html)) {
          const fixed = html.replace(re, '$3$2$1')
          writeFileSync(htmlPath, fixed, 'utf-8')
        }
      },
    },
  ],
  base: '/',
})
