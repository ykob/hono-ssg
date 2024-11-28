import dayjs from 'dayjs';
import fs from 'fs';
import { convertMarkdownToHtml } from './';

const postFiles = fs.readdirSync('./posts');

export const loadPosts = async ({
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
