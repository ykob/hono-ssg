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
    <article>
      <header class={styles.header}>
        <div class={styles.headerInner}>
          <h1 class={styles.heading}>{title}</h1>
          <div>Created At: {dayjs(date).format('YYYY/MM/DD')}</div>
          <p class={styles.description}>{description}</p>
        </div>
      </header>
      <div class={styles.content}>
        <div
          class={styles.contentInner}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  );
}

const styles = {
  header: css`
    background-color: #fff;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  `,
  headerInner: css`
    max-width: 1120px;
    margin-inline: auto;
    @media (width < 1024px) {
      padding: 24px 40px;
    }
    @media (width >= 1024px) {
      padding: 60px 80px;
    }
  `,
  heading: css`
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 24px;
    font-size: 2.4rem;
  `,
  description: css`
    margin-bottom: 0;
  `,
  content: css`
    max-width: 1200px;
    margin-inline: auto;
    @media (width < 1024px) {
      padding: 24px 20px;
    }
    @media (width >= 1024px) {
      padding: 60px 40px;
    }
  `,
  contentInner: css`
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    @media (width < 1024px) {
      padding: 24px 20px;
    }
    @media (width >= 1024px) {
      padding: 60px 40px;
    }
    *:first-child {
      margin-top: 0;
    }
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
