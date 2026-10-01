import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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
});
