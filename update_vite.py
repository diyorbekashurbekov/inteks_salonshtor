config = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    host: true,
  }
})
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\vite.config.js", "w", encoding="utf-8") as f:
    f.write(config)
print("Updated vite.config.js")
