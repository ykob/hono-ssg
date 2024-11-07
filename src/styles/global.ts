import { css } from 'hono/css';

export const globalStyles = css`
  :-hono-global {
    body {
      margin: 0;
      padding: 0;
      color: #1c1917;
      background-color: #f5f5f4;
      font-family: 'Noto Sans JP', serif;
      font-optical-sizing: auto;
      font-style: normal;
    }
  }
`;
