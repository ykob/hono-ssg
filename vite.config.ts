import ssg from "@hono/vite-ssg";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [ssg()],
});
