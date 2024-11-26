import { css } from 'hono/css';

export function HomeHeader() {
  return (
    <div class={styles.header}>
      <div class={styles.headerInner}>
        <h1>hono-ssg</h1>
      </div>
    </div>
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
};
