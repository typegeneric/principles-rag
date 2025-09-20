import type { AiChatMessage } from "@/features/ai-chat/types/ai-chat-message.type";
import type { Role } from "@/features/ai-chat/types/role.type";

let counter = 0;

export function createChatMessage(role: Role, content: string): AiChatMessage {
  counter += 1;
  return {
    id: counter.toString(),
    role,
    content,
  };
}
