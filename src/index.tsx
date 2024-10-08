import { Hono } from 'hono';
import { Layout } from './components';

// index.tsx
const app = new Hono();

app.get('/', (c) =>
  c.html(
    <Layout title="Hello, World Title">
      <p>Hello, World!</p>
    </Layout>,
  ),
);

export default app;
