"use client";
import { PromptInputArea } from "@/features/ai-chat/components/prompt-input-area";

export function AiChatPageContent() {
  const handleSubmit = (question: string) => {
    alert(`You asked: ${question}`);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex-1 bg-white/5 p-4">Chat History Area</div>
      <PromptInputArea onSubmit={handleSubmit} />
    </div>
  );
}
