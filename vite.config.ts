import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Project site: https://<username>.github.io/idforge/
  // Must match repo name. Change to '/' for user site or custom domain.
  base: '/idforge/',
  plugins: [react(), tailwindcss()],
})
