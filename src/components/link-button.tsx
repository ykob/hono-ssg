import { css, cx } from 'hono/css';
import { PropsWithChildren } from 'hono/jsx';

type LinkButtonProps = PropsWithChildren<{
  href: string;
  square?: boolean;
  target?: string;
}>;

export function LinkButton({
  children,
  href,
  square,
  target,
}: LinkButtonProps) {
  const className = cx(styles.button, square ? styles.square : styles.full);

  return (
    <a class={className} href={href} target={target}>
      {children}
    </a>
  );
}

const styles = {
  button: css`
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
  full: css`
    width: 100%;
  `,
  square: css`
    width: 32px;
  `,
};
