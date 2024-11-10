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
      <div dangerouslySetInnerHTML={{ __html: html }} />
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
};
