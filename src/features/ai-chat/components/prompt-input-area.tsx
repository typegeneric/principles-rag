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
};

export function PromptInputArea({
  onSubmit = (question) => alert(`You asked: ${question}`),
}: Props) {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(question);
      return;
    }
  };

  return (
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
  );
}
