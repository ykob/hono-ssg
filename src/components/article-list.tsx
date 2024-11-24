import { css } from 'hono/css';
import { PropsWithChildren } from 'hono/jsx';

export function ArticleList({ children }: PropsWithChildren) {
  return <div class={styles.container}>{children}</div>;
}

const styles = {
  container: css`
    box-sizing: border-box;
    container-type: 'inline-size';
    display: grid;
    gap: 24px;
    margin-inline: auto;
    @media (width < 1024px) {
      padding: 24px 20px;
    }
    @media (width >= 1024px) {
      max-width: 1104px;
      padding: 60px 40px;
    }
  `,
};
