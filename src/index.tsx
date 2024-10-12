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
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

app.get('/', async (c) => {
  const markdown = fs.readFileSync('./src/index.md', 'utf-8');
  const content = await processor.process(markdown);
  const props = {
    title: 'Hello, World Title',
    description: '',
  };

  return c.html(
    <Layout {...props}>
      <div dangerouslySetInnerHTML={{ __html: String(content) }} />
    </Layout>,
  );
});

export default app;
