import { mdiGithub, mdiTwitter } from '@mdi/js';
import { css } from 'hono/css';
import { PropsWithChildren } from 'hono/jsx';
import { LinkButton } from './';

type SideNaviProps = PropsWithChildren<{
  years: string[];
}>;

export function SideNavi({ years }: SideNaviProps) {
  return (
    <nav class={styles.container}>
      <div class={styles.inner}>
        <LinkButton href="/">Home</LinkButton>
        <h2 class={styles.subHeading}>Yearly Archive</h2>
        <ul class={styles.yearArchiveLinks}>
          {years.map((year) => (
            <li>
              <LinkButton href={`/archive/${year}/`}>{year}</LinkButton>
            </li>
          ))}
        </ul>
        <ul class={styles.socialLinks}>
          <li>
            <LinkButton href="https://x.com/ykob0123" target="_blank" square>
              <svg class="icon" width="24" height="24" viewBox="0 0 24 24">
                <path d={mdiTwitter} />
              </svg>
            </LinkButton>
          </li>
          <li>
            <LinkButton href="https://github.com/ykob" target="_blank" square>
              <svg class="icon" width="24" height="24" viewBox="0 0 24 24">
                <path d={mdiGithub} />
              </svg>
            </LinkButton>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  container: css`
    color: #fff;
    background-color: var(--color-bg-nav);
  `,
  inner: css`
    display: grid;
    gap: 16px;
    position: sticky;
    top: 0;
    left: 0;
    @media (width < 1024px) {
      padding: 24px 16px 48px;
    }
    @media (width >= 1024px) {
      padding: 16px;
    }
  `,
  subHeading: css`
    margin: 0 6px;
    color: var(--color-text-revert-secondary);
    font-size: 1rem;
    font-weight: 500;
  `,
  yearArchiveLinks: css`
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
    @media (width < 1024px) {
      display: flex;
    }
    @media (width >= 1024px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  `,
  socialLinks: css`
    display: flex;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
  `,
};
