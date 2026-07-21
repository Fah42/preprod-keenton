// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Domaine public du site : requis pour le sitemap, les canonical et les
  // balises Open Graph (BaseLayout). A ajuster si le domaine final differe.
  site: 'https://keenton.com',

  integrations: [vue(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
