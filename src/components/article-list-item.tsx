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
    <div class={styles.container}>
      <div class={styles.inner}>
        <p class={styles.date}>{dayjs(date).format('YYYY/MM/DD')}</p>
        <div class={styles.content}>
          <Heading class={styles.heading}>
            <a href={`/posts/${id}/`}>{title}</a>
          </Heading>
          <p class={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: css`
    container-type: inline-size;
    display: block;
  `,
  inner: css`
    display: grid;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    @media (width < 1024px) {
      gap: 12px;
      padding: 32px 20px;
    }
    @media (width >= 1024px) {
      grid-template-columns: auto 1fr;
      gap: 32px;
      padding: 48px 40px;
    }
  `,
  date: css`
    line-height: 1.2;
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
  `,
  content: css`
    display: grid;
    gap: 12px;
  `,
  heading: css`
    line-height: 1.2;
    margin-top: -0.16em;
    margin-bottom: 0;
    font-size: 2rem;
    a {
      color: var(--color-text);
      text-decoration: none;
      transition: color 0.1s;
    }
    a :hover {
      color: var(--color-link);
    }
  `,
  description: css`
    margin: 0;
  `,
};
