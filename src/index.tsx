import fs from 'fs';
import { Hono } from 'hono';
import { ssgParams } from 'hono/ssg';
import {
  ArchiveHeader,
  Article,
  ArticleList,
  ArticleListItem,
  HomeHeader,
  Layout,
} from './components';
import { convertMarkdownToHtml, loadPosts, loadYears } from './utils';

const app = new Hono();
const postFiles = fs.readdirSync('./posts');

app.get('/', async (c) => {
  const markdown = fs.readFileSync('./src/index.md', 'utf-8');
  const { props } = await convertMarkdownToHtml(markdown);
  const posts = await loadPosts();
  const years = await loadYears();

  return c.html(
    <Layout {...props} years={years}>
      <HomeHeader />
      <ArticleList>
        {posts.map(async ({ ...props }) => {
          return <ArticleListItem key={props.id} {...props} />;
        })}
      </ArticleList>
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
        <Article {...props} html={html} />
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
    const posts = await loadPosts({ year });
    const props = {
      title: `Archive ${year}`,
      description: `Archive ${year}`,
    };

    if (year === ':year' || posts.length === 0) {
      return c.notFound();
    }

    return c.html(
      <Layout years={years} {...props}>
        <ArchiveHeader title={`Archive ${year}`} />
        <ArticleList>
          {posts.map(async ({ ...props }) => {
            return <ArticleListItem key={props.id} {...props} />;
          })}
        </ArticleList>
      </Layout>,
    );
  },
);

export default app;
