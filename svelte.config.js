import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess({ script: 'typescript' }),

  kit: {
    adapter: adapter({
      runtime: 'nodejs18.x'
    })
  }
};

export default config;
