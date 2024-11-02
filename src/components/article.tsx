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
      <div>{dayjs(date).format('YYYY/MM/DD')}</div>
      <p>{description}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

const styles = {
  heading: css`
    margin-top: 0;
  `,
};
