import { Hono } from "hono";

// index.tsx
const app = new Hono();

app.get("/", (c) => c.html("Hello, World!"));

export default app;
