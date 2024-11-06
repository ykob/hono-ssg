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
    border-radius: 6px;
    background-color: transparent;
    transition: background-color 0.2s ease;
    &:hover {
      color: #fff;
      background-color: #e11d48;
    }
    & svg {
      fill: currentColor;
    }
  `,
};
