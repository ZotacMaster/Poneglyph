"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import type { Message } from "@/lib/types";

interface MessageThreadProps {
  initialMessages: Message[];
}

export function MessageThread({ initialMessages }: MessageThreadProps) {
  const [messages] = useState<Message[]>(initialMessages);
  const { data: session } = authClient.useSession();
  const currentUserId = session?.user?.id || "";
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto flex-1 bg-background">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-xl text-sm ${
                msg.senderId === currentUserId
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}
