import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://www.wildpark-eekholt.de',
  build: { format: 'directory' },
  trailingSlash: 'ignore',
});
