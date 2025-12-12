import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import React from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
   plugins: [React(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
