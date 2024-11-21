import { css } from 'hono/css';
import { PropsWithChildren } from 'hono/jsx';

export function Articles({ children }: PropsWithChildren) {
  return <div class={styles.container}>{children}</div>;
}

const styles = {
  container: css`
    display: grid;
  `,
};
