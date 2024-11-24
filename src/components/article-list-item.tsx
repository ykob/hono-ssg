import dayjs from 'dayjs';
import { css } from 'hono/css';
import { PropsWithChildren } from 'hono/jsx';

type ArticleListItemProps = PropsWithChildren<{
  date: string;
  description: string;
  id: string;
  title: string;
}>;

export function ArticleListItem({
  date,
  description,
  id,
  title,
}: ArticleListItemProps) {
  const Heading = 'h2';

  return (
    <a class={styles.container} href={`/posts/${id}/`}>
      <p class={styles.date}>{dayjs(date).format('YYYY/MM/DD')}</p>
      <div class={styles.content}>
        <Heading class={styles.heading}>{title}</Heading>
        <p class={styles.description}>{description}</p>
      </div>
    </a>
  );
}

const styles = {
  container: css`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
    box-sizing: border-box;
    color: #333;
    text-decoration: none;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    @media (width < 1024px) {
      padding: 16px 20px;
    }
    @media (width >= 1024px) {
      padding: 32px 40px;
    }
  `,
  date: css`
    line-height: 1.2;
    margin: 0;
    font-size: 1.6rem;
  `,
  content: css`
    display: grid;
    gap: 8px;
  `,
  heading: css`
    line-height: 1.2;
    margin: 0;
    font-size: 2rem;
  `,
  description: css`
    margin: 0;
  `,
};