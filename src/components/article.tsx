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
    background-color: var(--color-bg-secondary);
  `,
  content: css`
    h2 {
      margin-top: 3.6rem;
      margin-bottom: 1rem;
      font-size: 1.8rem;
    }
    h3 {
      margin-top: 3.2rem;
      margin-bottom: 1rem;
      font-size: 1.6rem;
    }
    h4 {
      margin-top: 2.4rem;
      margin-bottom: 1rem;
      font-size: 1.4rem;
    }
    h5 {
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }
    h6 {
      margin-top: 1.6rem;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
    blockquote {
      margin-left: 0;
      padding: 4px 24px;
      border-left: 8px solid #a8a29e;
      background-color: #e7e5e4;
    }
  `,
};
