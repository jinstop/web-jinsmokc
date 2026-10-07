// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 本项目是纯静态站（output: 'static'，全站预渲染），不需要 SSR worker。
// 因此不引入 @astrojs/cloudflare adapter，避免生成无用的 _worker.js 空壳目录。
// 部署走 Cloudflare Workers 的 Static Assets（wrangler.jsonc 中 assets.directory = ./dist）。
// https://astro.build/config
export default defineConfig({
  site: 'https://www.jins.mokc.top',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      // keep the output small
      assetsInlineLimit: 4096,
    },
  },
});
