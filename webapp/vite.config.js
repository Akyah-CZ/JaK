import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use /JAK/ base only on GitHub Pages builds; otherwise serve from root '/'
export default defineConfig(() => {
  const isGithubPages = process.env.GITHUB_PAGES === 'true';
  return {
    plugins: [react()],
    base: isGithubPages ? '/JaK/' : '/',
  };
});
