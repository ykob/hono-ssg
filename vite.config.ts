import devServer from '@hono/vite-dev-server';
import ssg from '@hono/vite-ssg';
import { defineConfig } from 'vite';

const entry = 'src/index.ts';

export default defineConfig({
  plugins: [devServer({ entry }), ssg({ entry })],
  server: {
    host: true,
    port: 3000,
  },
});
