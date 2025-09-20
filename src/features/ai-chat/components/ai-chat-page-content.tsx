"use client";

import { MessageSquare } from "lucide-react";
import { useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { PromptInputArea } from "@/features/ai-chat/components/prompt-input-area";
import type { AiChatMessage } from "@/features/ai-chat/types/ai-chat-message.type";
import { createChatMessage } from "@/features/ai-chat/utils/create-chat-message";
import { hono } from "@/lib/hono.client";

export function AiChatPageContent() {
  const [aiChatMessages, setAiChatMessages] = useState<AiChatMessage[]>([]);
  const [isAsking, setIsAsking] = useState(false);

  const handleSubmit = async (question: string) => {
    if (!question.trim()) {
      return;
    }

    const userMessage = createChatMessage("user", question);
    setAiChatMessages((prev) => [...prev, userMessage]);

    setIsAsking(true);

    try {
      const res = await hono.api.ask.$post({ json: { question } });

      if (res.ok) {
        const data = await res.json();
        const assistantMessage = createChatMessage("assistant", data.answer);
        setAiChatMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMsg = createChatMessage(
          "assistant",
          "Something went wrong. Please ask again later."
        );
        setAiChatMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err) {
      console.error(err);
      const errorMsg = createChatMessage(
        "assistant",
        "Something went wrong. Please ask again later."
      );
      setAiChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col p-4">
        <Conversation className="flex flex-1 flex-col">
          <ConversationContent className="flex-1 overflow-y-auto">
            {aiChatMessages.length === 0 ? (
              <ConversationEmptyState
                description="Type a message below to begin chatting"
                icon={<MessageSquare className="size-12" />}
                title="Start a conversation"
              />
            ) : (
              <>
                {aiChatMessages.map((message) => (
                  <Message from={message.role} key={message.id}>
                    <MessageContent>
                      <Response>{message.content}</Response>
                    </MessageContent>
                  </Message>
                ))}
                {isAsking && (
                  <Message from="assistant" key="loading">
                    <MessageContent>
                      <Response>Give me a moment to think...</Response>
                    </MessageContent>
                  </Message>
                )}
              </>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      <div className="sticky bottom-0 border-t bg-background p-4">
        <PromptInputArea isAsking={isAsking} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
