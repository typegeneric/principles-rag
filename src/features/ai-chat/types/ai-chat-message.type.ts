import { z } from "zod";

import { RoleEnum } from "@/features/ai-chat/types/role.type";

export const AiChatMessageSchema = z.object({
  id: z.string(),
  role: RoleEnum,
  content: z.string(),
});

export type AiChatMessage = z.infer<typeof AiChatMessageSchema>;
