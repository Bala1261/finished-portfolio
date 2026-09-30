import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        portfolio: resolve(import.meta.dirname, 'pages/portfolio.html'),
        contact: resolve(import.meta.dirname, 'pages/contact.html'),
        hireMe: resolve(import.meta.dirname, 'pages/hire-me.html'),
      },
    },
  },
})


