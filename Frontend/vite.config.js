import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or your respective framework plugin
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
