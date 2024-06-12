import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import prefetch from "@astrojs/prefetch";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://spectrum-transport.com',
  integrations: [tailwind(), react(), prefetch(), sitemap()],
  output: 'server',
});