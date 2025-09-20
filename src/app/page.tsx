import { Navbar } from "@/components/navbar";
import { AiChatPageContent } from "@/features/ai-chat/components/ai-chat-page-content";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1">
        <AiChatPageContent />
      </main>
    </div>
  );
}
