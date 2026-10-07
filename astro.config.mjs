// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jins.mokc.top',
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: { enabled: true },
  }),
  integrations: [sitemap()],
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      // keep the worker bundle lean
      assetsInlineLimit: 4096,
    },
  },
});
