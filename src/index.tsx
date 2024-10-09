import fs from 'fs';
import { Hono } from 'hono';
import { Layout } from './components';

// index.tsx
const app = new Hono();

app.get('/', (c) => {
  const content = fs.readFileSync('./src/index.md', 'utf-8');

  return c.html(<Layout title="Hello, World Title">{content}</Layout>);
});

export default app;
