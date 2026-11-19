// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import caseImagePreviews from './scripts/case-image-previews.mjs';
import { siteConfig } from './src/config/site.ts';

const noindexPaths = ['/cookies/', '/privacy/', '/terms/'];

export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: {
      themes: { dark: 'github-dark', light: 'github-light' },
      defaultColor: 'dark',
    },
  },
  integrations: [
    mdx(),
    caseImagePreviews(),
    sitemap({
      filter: (page) => !noindexPaths.includes(new URL(page).pathname) && !new URL(page).pathname.startsWith('/admin/'),
    }),
  ],
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
