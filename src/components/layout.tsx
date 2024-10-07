import { PropsWithChildren } from 'hono/jsx';

export function Layout({ children }: PropsWithChildren) {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
