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

type Props = {
  onSubmit?: (question: string) => void;
  isAsking?: boolean;
};

export function PromptInputArea({
  onSubmit = (question) => alert(`You asked: ${question}`),
  isAsking = false,
}: Props) {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    if (!question.trim()) {
      return;
    }

    onSubmit?.(question);
    setQuestion("");
  };

  return (
    <PromptInput className="relative" onSubmit={handleSubmit}>
      <PromptInputBody>
        <PromptInputAttachments>
          {(attachment) => <PromptInputAttachment data={attachment} />}
        </PromptInputAttachments>
        <PromptInputTextarea
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your message..."
          value={question}
        />
      </PromptInputBody>
      <PromptInputToolbar>
        <PromptInputSubmit
          className="ms-auto"
          disabled={isAsking}
          status={isAsking ? "streaming" : "ready"}
        />
      </PromptInputToolbar>
    </PromptInput>
  );
}
