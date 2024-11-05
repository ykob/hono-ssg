import { css } from 'hono/css';
import { PropsWithChildren } from 'hono/jsx';

type LinkButtonProps = PropsWithChildren<{
  href: string;
  target?: string;
}>;

export function LinkButton({ children, href, target }: LinkButtonProps) {
  return (
    <a class={styles.button} href={href} target={target}>
      {children}
    </a>
  );
}

const styles = {
  button: css`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: #0070f3;
  `,
};
