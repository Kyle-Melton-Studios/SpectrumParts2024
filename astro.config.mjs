import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: 'https://spectrum-transport.com',
  integrations: [tailwind(), react(), prefetch(), sitemap()],
  output: 'hybrid',
  adapter: node({
    mode: "standalone"
  })
});