import { css } from 'hono/css';

export const globalStyles = css`
  :-hono-global {
    :root {
      --color-text: #1c1917;
    }
    body {
      margin: 0;
      padding: 0;
      color: var(--color-text);
      background-color: #f5f5f4;
      font-family: 'Noto Sans JP', serif;
      font-optical-sizing: auto;
      font-style: normal;
    }
  }
`;
