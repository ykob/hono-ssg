import { css } from 'hono/css';

export const globalStyles = css`
  :-hono-global {
    :root {
      --color-text: #292622;
      --color-text-revert: #ffffff;
      --color-bg-nav: #423e37;
      --color-bg-secondary: #edebd7;
      --color-attention: #e3b23c;
      --color-link: #dca21c;
    }
    html {
      scrollbar-width: thin;
      scrollbar-color: var(--color-bg-nav) var(--color-bg-secondary);
    }
    body {
      margin: 0;
      padding: 0;
      color: var(--color-text);
      background-color: #fff;
      font-family: 'Noto Sans JP', serif;
      font-optical-sizing: auto;
      font-style: normal;
      background-color: var(--color-bg-secondary);
    }
    a {
      color: var(--color-link);
    }
  }
`;
