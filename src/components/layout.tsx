import { mdiGithub, mdiTwitter } from '@mdi/js';
import { css, Style } from 'hono/css';
import { PropsWithChildren } from 'hono/jsx';
import { globalStyles } from '../styles/global';
import { LinkButton } from './';

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
          <header class={styles.header}>
            <div>
              <a href="/">hono-ssg</a>
            </div>
          </header>
          <main class={styles.main}>
            <div class={styles.mainIn}>{children}</div>
          </main>
          <nav>
            <div class={styles.nav}>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                {years.map((year) => (
                  <li>
                    <a href={`/archive/${year}/`}>{year}</a>
                  </li>
                ))}
              </ul>
              <ul class={styles.socialLinks}>
                <li>
                  <LinkButton href="https://x.com/ykob0123" target="_blank">
                    <svg
                      class="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d={mdiTwitter} />
                    </svg>
                  </LinkButton>
                </li>
                <li>
                  <LinkButton href="https://github.com/ykob" target="_blank">
                    <svg
                      class="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d={mdiGithub} />
                    </svg>
                  </LinkButton>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </body>
    </html>
  );
}

const styles = {
  container: css`
    display: grid;
    gap: 24px;
    @media (width < 1024px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      padding: 24px 20px;
    }
    @media (width >= 1024px) {
      grid-template-columns: 240px 1fr;
      grid-template-rows: auto 1fr;
      padding: 40px 80px;
    }
  `,
  header: css``,
  main: css`
    @media (width >= 1024px) {
      grid-column: 2;
      grid-row: 1 / 3;
    }
  `,
  mainIn: css`
    max-width: 1024px;
    margin-inline: auto;
  `,
  nav: css`
    display: block;
    position: sticky;
    top: 0;
    left: 0;
  `,
  socialLinks: css`
    display: flex;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
  `,
};
