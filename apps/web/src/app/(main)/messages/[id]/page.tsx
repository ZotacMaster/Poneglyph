"use client";

import Link from "next/link";
import { use, useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { MessageThread } from "./_components/message-thread";
import { MessageInput } from "./_components/message-input";
import type { Message } from "@/lib/types";

// Static mock data for conversations
const STATIC_CONVERSATIONS: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      senderId: "user-2",
      content: "Hi! I saw your volunteer profile and would love to connect.",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      readAt: null,
    },
    {
      id: "msg-2",
      senderId: "user-1",
      content: "Thanks for reaching out! Happy to chat about potential collaboration.",
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      readAt: new Date().toISOString(),
    },
  ],
  "conv-user-2": [
    {
      id: "msg-3",
      senderId: "user-2",
      content: "Hi! I saw your volunteer profile and would love to connect.",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      readAt: null,
    },
  ],
};

export default function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: conversationId } = use(params);
  const [messages, setMessages] = useState<Message[]>(STATIC_CONVERSATIONS[conversationId] || []);

  const handleMessageSent = (newMessage: Message) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl h-[calc(100vh-8rem)] flex flex-col">
      <Link
        href="/messages"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <IconArrowLeft className="w-4 h-4" />
        Back to Messages
      </Link>

      <div className="flex-1 flex flex-col border border-border rounded-lg overflow-hidden">
        <MessageThread initialMessages={messages} />

        <MessageInput onMessageSent={handleMessageSent} />
      </div>
    </div>
  );
}
