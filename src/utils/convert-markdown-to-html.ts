import { processor } from './';

export const convertMarkdownToHtml = async (markdown: string) => {
  const { data, value } = await processor.process(markdown);
  const props = {
    title: String(data.title) || '',
    description: String(data.description) || '',
    date: String(data.date) || '',
  };

  return { html: String(value), props };
};
