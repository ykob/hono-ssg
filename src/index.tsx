import dayjs from 'dayjs';
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
const loadPostsAll = () => {
  return Promise.all(
    postFiles.map(async (file) => {
      const id = file.replace(/\.md$/, '');
      const markdown = fs.readFileSync(`./posts/${id}.md`, 'utf-8');
      const { props } = await convertMarkdownToHtml(markdown);

      return { id, ...props };
    }),
  );
};
const loadPostsByYear = async (year: string) => {
  const posts = await loadPostsAll();

  return posts.filter((post) => post.date.startsWith(year));
};
const loadYears = async () => {
  const posts = await loadPostsAll();

  return [...new Set(posts.map((post) => post.date.split('-')[0]))];
};

app.get('/', async (c) => {
  const markdown = fs.readFileSync('./src/index.md', 'utf-8');
  const { html, props } = await convertMarkdownToHtml(markdown);
  const posts = await loadPostsAll();
  const years = await loadYears();

  return c.html(
    <Layout {...props} years={years}>
      <div dangerouslySetInnerHTML={{ __html: String(html) }} />
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map(async ({ id, date, title }) => {
            return (
              <li>
                <a href={`/posts/${id}/`}>
                  {dayjs(date).format('YYYY/MM/DD')} {title}
                </a>
              </li>
            );
          })}
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
    const years = await loadYears();

    if (id === ':id' || !postFiles.includes(`${id}.md`)) {
      return c.notFound();
    }

    const markdown = fs.readFileSync(`./posts/${id}.md`, 'utf-8');
    const { html, props } = await convertMarkdownToHtml(markdown);

    return c.html(
      <Layout {...props} years={years}>
        <div>{dayjs(props.date).format('YYYY/MM/DD')}</div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>,
    );
  },
);

app.get(
  '/archive/:year/',
  ssgParams(async () => {
    const postYears = await loadYears();

    return postYears.map((year) => ({
      year,
    }));
  }),
  async (c) => {
    const year = c.req.param('year');
    const years = await loadYears();
    const posts = await loadPostsByYear(year);
    const props = {
      title: `Archive ${year}`,
      description: `Archive ${year}`,
    };

    if (year === ':year' || posts.length === 0) {
      return c.notFound();
    }

    return c.html(
      <Layout years={years} {...props}>
        <ul>
          {posts.map((post) => (
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
