import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: 'https://spectrum-transport.com',
  integrations: [tailwind(), react(), sitemap()],
  output: 'server',
  adapter: netlify()
});