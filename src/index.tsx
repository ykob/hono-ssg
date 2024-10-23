import fs from 'fs';
import { Hono } from 'hono';
import { ssgParams } from 'hono/ssg';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkBreaks from 'remark-breaks';
import remarkExtractFrontmatter from 'remark-extract-frontmatter';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import yaml from 'yaml';
import { Layout } from './components';

const app = new Hono();
const processor = remark()
  .use(remarkFrontmatter)
  .use(remarkExtractFrontmatter, { yaml: yaml.parse })
  .use(remarkBreaks)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify);
const postFiles = fs.readdirSync('./posts');

const convertMarkdownToHtml = async (markdown: string) => {
  const { data, value } = await processor.process(markdown);
  const props = {
    title: String(data.title) || '',
    description: String(data.description) || '',
    date: String(data.date) || '',
  };

  return { html: String(value), props };
};
const loadPosts = () => {
  return Promise.all(
    postFiles.map(async (file) => {
      const id = file.replace(/\.md$/, '');
      const markdown = fs.readFileSync(`./posts/${id}.md`, 'utf-8');
      const { props } = await convertMarkdownToHtml(markdown);

      return { id, ...props };
    }),
  );
};
const loadPostYears = async () => {
  const posts = await loadPosts();

  return [...new Set(posts.map((post) => post.date.split('-')[0]))];
};

app.get('/', async (c) => {
  const markdown = fs.readFileSync('./src/index.md', 'utf-8');
  const { html, props } = await convertMarkdownToHtml(markdown);
  const posts = await loadPosts();
  const postYears = await loadPostYears();

  return c.html(
    <Layout {...props}>
      <div dangerouslySetInnerHTML={{ __html: String(html) }} />
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map(async ({ id, date, title }) => {
            return (
              <li>
                <a href={`/posts/${id}/`}>
                  {date} {title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h2>Archive</h2>
        <ul>
          {postYears.map((year) => (
            <li>
              <a href={`/archive/${year}/`}>{year}</a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>,
  );
});

app.get(
  '/posts/:id/',
  ssgParams(() => {
    return postFiles.map((file) => ({
      id: file.replace(/\.md$/, ''),
    }));
  }),
  async (c) => {
    const id = c.req.param('id');

    if (id === ':id' || !postFiles.includes(`${id}.md`)) {
      return c.notFound();
    }

    const markdown = fs.readFileSync(`./posts/${id}.md`, 'utf-8');
    const { html, props } = await convertMarkdownToHtml(markdown);

    return c.html(
      <Layout {...props}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>,
    );
  },
);

app.get(
  '/archive/:year/',
  ssgParams(async () => {
    const postYears = await loadPostYears();

    return postYears.map((year) => ({
      year,
    }));
  }),
  async (c) => {
    const year = c.req.param('year');
    const posts = await loadPosts();
    const filteredPosts = posts.filter((post) => post.date.startsWith(year));
    const props = {
      title: `Archive ${year}`,
      description: `Archive ${year}`,
    };

    if (year === ':year' || filteredPosts.length === 0) {
      return c.notFound();
    }

    return c.html(
      <Layout {...props}>
        <h1>Archive {year}</h1>
        <ul>
          {filteredPosts.map((post) => (
            <li>
              <a href={`/posts/${post.id}/`}>
                {post.date} {post.title}
              </a>
            </li>
          ))}
        </ul>
      </Layout>,
    );
  },
);

export default app;
