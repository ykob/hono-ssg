import { PropsWithChildren } from 'hono/jsx';

type LayoutProps = PropsWithChildren<{
  title: string;
}>;

export function Layout({ children, title }: LayoutProps) {
  return (
    <html>
      <head>
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
