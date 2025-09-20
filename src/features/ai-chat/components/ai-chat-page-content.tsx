"use client";

import { useState } from "react";

import {
  PromptInput,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ai-elements/prompt-input";

export function AiChatPageContent() {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    alert(`You asked: ${question}`);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex-1 bg-white/5 p-4">Chat History Area</div>
      <PromptInput className="relative" onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputAttachments>
            {(attachment) => <PromptInputAttachment data={attachment} />}
          </PromptInputAttachments>
          <PromptInputTextarea
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
        </PromptInputBody>
        <PromptInputToolbar>
          <PromptInputSubmit
            className="ms-auto"
            disabled={false}
            status={"ready"}
          />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
}
