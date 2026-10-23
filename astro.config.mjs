import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { getSiteUrl } from './src/lib/seo.ts';
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'PUBLIC_');
const site = getSiteUrl(env.PUBLIC_SITE_URL);
export default defineConfig({
  site,
  integrations: site ? [sitemap({ filter: page => !page.includes('__accessibility') })] : [],
  output: "static",
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
