import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    allowedHosts:["e4667b9fcb2be312-135-237-130-231.serveousercontent.com"]
  }
  
})
