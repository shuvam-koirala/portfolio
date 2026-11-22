import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://shuvam-koirala.github.io',
  base: process.env.BASE_PATH ?? '/portfolio',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
