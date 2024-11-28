import dayjs from 'dayjs';
import fs from 'fs';
import { Hono } from 'hono';
import { ssgParams } from 'hono/ssg';
import {
  Article,
  ArticleList,
  ArticleListItem,
  HomeHeader,
  Layout,
} from './components';
import { processor } from './utils';

const app = new Hono();
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
const loadPosts = async ({
  year,
  offset,
  perPage,
}: {
  year?: string;
  offset?: number;
  perPage?: number;
} = {}) => {
  const posts = await Promise.all(
    postFiles.map(async (file) => {
      const id = file.replace(/\.md$/, '');
      const markdown = fs.readFileSync(`./posts/${id}.md`, 'utf-8');
      const { props } = await convertMarkdownToHtml(markdown);

      return { id, ...props };
    }),
  );

  return posts
    .filter((post) => {
      if (year) {
        return dayjs(post.date).format('YYYY') === year;
      }
      return true;
    })
    .filter((_, i) => {
      if (offset !== undefined && perPage !== undefined) {
        return i >= offset && i < offset + perPage;
      }
      return true;
    });
};
const loadYears = async () => {
  const posts = await loadPosts();

  return [...new Set(posts.map((post) => post.date.split('-')[0]))];
};

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
        <h1>Archive {year}</h1>
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
