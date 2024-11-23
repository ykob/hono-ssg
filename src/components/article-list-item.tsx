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
      <Heading>{title}</Heading>
      <p>{dayjs(date).format('YYYY/MM/DD')}</p>
      <p>{description}</p>
    </a>
  );
}

const styles = {
  container: css`
    display: block;
    box-sizing: border-box;
    padding: 24px 20px;
    color: #333;
    text-decoration: none;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  `,
};
