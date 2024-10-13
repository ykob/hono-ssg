import fs from 'fs';
import { Hono } from 'hono';
import { ssgParams } from 'hono/ssg';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkExtractFrontmatter from 'remark-extract-frontmatter';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import yaml from 'yaml';
import { Layout } from './components';

// index.tsx
const app = new Hono();
const processor = remark()
  .use(remarkFrontmatter)
  .use(remarkExtractFrontmatter, { yaml: yaml.parse })
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify);
const posts = fs.readdirSync('./posts');

app.get('/', async (c) => {
  const markdown = fs.readFileSync('./src/index.md', 'utf-8');
  const { data, value } = await processor.process(markdown);
  const props = {
    title: String(data.title) || '',
    description: String(data.description) || '',
  };

  return c.html(
    <Layout {...props}>
      <div dangerouslySetInnerHTML={{ __html: String(value) }} />
    </Layout>,
  );
});

app.get(
  '/posts/:id/',
  ssgParams(() => {
    return posts.map((post) => {
      return {
        id: post.replace(/\.md$/, ''),
      };
    });
  }),
  async (c) => {
    const markdown = fs.readFileSync(
      `./posts/${c.req.param('id')}.md`,
      'utf-8',
    );
    const { data, value } = await processor.process(markdown);
    const props = {
      title: String(data.title) || '',
      description: String(data.description) || '',
    };

    return c.html(
      <Layout {...props}>
        <div dangerouslySetInnerHTML={{ __html: String(value) }} />
      </Layout>,
    );
  },
);

export default app;
