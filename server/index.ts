import { zValidator } from "@hono/zod-validator";
import { AutoRagService } from "@server/src/services/autorag.service";
import { Hono } from "hono";
import { z } from "zod";
import { ENV_SERVER } from "@/config/env.server";

export const app = new Hono().basePath("/api").post(
  "/ask",
  zValidator(
    "json",
    z.object({
      question: z.string(),
    })
  ),
  async (c) => {
    const input = c.req.valid("json");

    const autoragService = new AutoRagService(
      ENV_SERVER.AUTORAG_API_URL,
      ENV_SERVER.AUTORAG_API_TOKEN
    );

    const answer = await autoragService.aiSearch(input.question);

    return c.json({
      answer,
    });
  }
);

export type AppType = typeof app;
