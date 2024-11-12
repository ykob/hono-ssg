import dayjs from 'dayjs';
import { css } from 'hono/css';

type ArticleProps = {
  date: string;
  description: string;
  html: string;
  title: string;
};

export function Article({ date, description, html, title }: ArticleProps) {
  return (
    <div>
      <h1 class={styles.heading}>{title}</h1>
      <div>Created At: {dayjs(date).format('YYYY/MM/DD')}</div>
      <p class={styles.description}>{description}</p>
      <div class={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

const styles = {
  heading: css`
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 24px;
  `,
  description: css`
    margin-bottom: 40px;
    padding: 24px;
    border-radius: 4px;
    background-color: #e7e5e4;
  `,
  content: css`
    blockquote {
      margin-left: 0;
      padding: 4px 24px;
      border-left: 8px solid #a8a29e;
      background-color: #e7e5e4;
    }
  `,
};
