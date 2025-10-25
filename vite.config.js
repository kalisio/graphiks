import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 5173,
    open: '/example/index.html'
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/graphiks.js'),
      name: 'Graphiks',
      fileName: (format) => `graphiks.${format}.js`
    },
    rollupOptions: {
      external: []
    },
    sourcemap: true,
    minify: true
  }
})
