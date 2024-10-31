import { css } from 'hono/css';

export const globalStyles = css`
  :-hono-global {
    body {
      margin: 0;
      padding: 0;
      background-color: #f0f0f0;
      font-family: 'Noto Sans JP', serif;
      font-optical-sizing: auto;
      font-style: normal;
    }
  }
`;
