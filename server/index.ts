import { Hono } from "hono";

export const app = new Hono().basePath("/api");

app.post("/ask", async (c) => {
  const body = await c.req.json();
  return c.json({
    body,
  });
});
