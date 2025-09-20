import type { AppType } from "@server/index";
import { hc } from "hono/client";

export const hono = hc<AppType>("/");
