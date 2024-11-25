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
    grid-template-columns: auto 1fr;
    gap: 24px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    @media (width < 1024px) {
      padding: 24px 20px;
    }
    @media (width >= 1024px) {
      padding: 32px 40px;
    }
  `,
  date: css`
    line-height: 1.2;
    margin: 0;
    font-size: 1.4rem;
  `,
  content: css`
    display: grid;
    gap: 12px;
  `,
  heading: css`
    line-height: 1.2;
    margin-top: -0.14em;
    margin-bottom: 0;
    font-size: 2rem;
    font-weight: 500;
  `,
  description: css`
    margin: 0;
  `,
};
