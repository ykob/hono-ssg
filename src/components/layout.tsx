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
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <meta property="og:site_name" content="hono-ssg" />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="ja_JP" />
        <Style />
      </head>
      <body class={globalStyles}>{children}</body>
    </html>
  );
}
