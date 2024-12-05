import { css, Style } from 'hono/css';
import { PropsWithChildren } from 'hono/jsx';
import { globalStyles } from '../styles/global';
import { GlobalHeader } from './global-header';
import { SideNavi } from './side-navi';

type LayoutProps = PropsWithChildren<{
  description: string;
  title: string;
  years: string[];
}>;

export function Layout({ children, description, title, years }: LayoutProps) {
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <Style />
      </head>
      <body class={globalStyles}>
        <div class={styles.container}>
          <GlobalHeader />
          <div class={styles.main}>{children}</div>
          <SideNavi years={years} />
        </div>
      </body>
    </html>
  );
}

const styles = {
  container: css`
    min-height: 100dvh;
    display: grid;
    @media (width < 1024px) {
      grid-template-columns: 1fr;
      grid-template-rows: 48px auto 1fr;
    }
    @media (width >= 1024px) {
      grid-template-columns: 240px 1fr;
      grid-template-rows: 60px 1fr;
    }
  `,
  main: css`
    @media (width < 1024px) {
      grid-column: 1;
      grid-row: 2;
    }
    @media (width >= 1024px) {
      grid-column: 2;
      grid-row: 1 / 3;
    }
  `,
};
