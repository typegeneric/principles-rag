import { z } from "zod";

export const RoleEnum = z.enum(["assistant", "user"]);
export type Role = z.infer<typeof RoleEnum>;
