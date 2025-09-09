import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@validations": path.resolve(__dirname, "src/validations"),
      "@assets": path.resolve(__dirname, "src/assets")
    }
  }

})
