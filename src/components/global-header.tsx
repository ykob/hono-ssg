import { css } from 'hono/css';

export function GlobalHeader() {
  return (
    <header class={styles.header}>
      <a class={styles.headerLink} href="/">
        blog.tplh.net
      </a>
    </header>
  );
}

const styles = {
  header: css`
    display: flex;
    align-items: center;
    padding-inline: 16px;
    background-color: var(--color-bg-nav);
  `,
  headerLink: css`
    color: #fff;
    font-weight: 700;
    text-decoration: none;
    @media (width < 1024px) {
      font-size: 1.2rem;
    }
    @media (width >= 1024px) {
      font-size: 1.4rem;
    }
  `,
};
