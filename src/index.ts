import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { Layout } from './components';

// index.tsx
const app = new Hono();

app.all('*', jsxRenderer(Layout));

app.get('/', (c) => c.render('Hello, World!'));

export default app;
