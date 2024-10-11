import fs from 'fs';
import { Hono } from 'hono';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { Layout } from './components';

// index.tsx
const app = new Hono();

const processor = remark()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true })
  .use(remarkGfm);

app.get('/', async (c) => {
  const file = fs.readFileSync('./src/index.md', 'utf-8');
  const content = await processor.process(file);

  return c.html(
    <Layout title="Hello, World Title">
      <div dangerouslySetInnerHTML={{ __html: String(content) }} />
    </Layout>,
  );
});

export default app;
