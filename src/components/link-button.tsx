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
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 6px;
    color: var(--color-text-revert);
    text-decoration: none;
    font-weight: 500;
    background-color: transparent;
    transition: background-color 0.2s ease;
    &:hover {
      color: var(--color-text);
      background-color: var(--color-link);
    }
    & svg {
      fill: currentColor;
    }
  `,
  full: css`
    width: 100%;
    padding-inline: 6px;
    justify-content: flex-start;
  `,
  square: css`
    width: 32px;
    justify-content: center;
  `,
};
