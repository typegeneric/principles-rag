"use client";

import { PromptInputArea } from "@/features/ai-chat/components/prompt-input-area";
import { hono } from "@/lib/hono.client";

export function AiChatPageContent() {
  const handleSubmit = async (question: string) => {
    const res = await hono.api.ask.$post({ json: { question } });

    if (res.ok) {
      const data = await res.json();
      alert(data.answer);
    } else {
      alert("Failed to get answer");
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex-1 bg-white/5 p-4">Chat History Area</div>
      <PromptInputArea onSubmit={handleSubmit} />
    </div>
  );
}
