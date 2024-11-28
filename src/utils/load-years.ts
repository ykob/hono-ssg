import { loadPosts } from './';

export const loadYears = async () => {
  const posts = await loadPosts();

  return [...new Set(posts.map((post) => post.date.split('-')[0]))];
};
