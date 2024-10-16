import { Style } from 'hono/css';
import { PropsWithChildren } from 'hono/jsx';
import { globalStyles } from '../styles/global';

type LayoutProps = PropsWithChildren<{
  description: string;
  title: string;
}>;

export function Layout({ children, description, title }: LayoutProps) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <Style />
      </head>
      <body class={globalStyles}>{children}</body>
    </html>
  );
}
