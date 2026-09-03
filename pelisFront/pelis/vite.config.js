import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    allowedHosts:["516f9903ca2b93e0-51-8-152-65.serveousercontent.com"]
  }
  
})
