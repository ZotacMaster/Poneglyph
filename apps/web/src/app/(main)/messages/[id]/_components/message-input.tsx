"use client";

import { useState, useRef } from "react";
import { Button } from "@Poneglyph/ui/components/button";
import { Input } from "@Poneglyph/ui/components/input";
import { authClient } from "@/lib/auth-client";
import { IconSend } from "@tabler/icons-react";

interface MessageInputProps {
  onMessageSent: (message: {
    id: string;
    senderId: string;
    content: string;
    createdAt: string;
    readAt: string | null;
  }) => void;
}

export function MessageInput({ onMessageSent }: MessageInputProps) {
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    const { data: session } = authClient.useSession();
    const senderId = session?.user?.id || "unknown";

    // Simulate sending message - update UI only
    const newMessage = {
      id: `local-${Date.now()}`,
      senderId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      readAt: null,
    };

    onMessageSent(newMessage);
    setContent("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-border p-4 flex gap-2">
      <Input
        ref={inputRef}
        placeholder="Type a message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={4000}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button type="submit" disabled={!content.trim()} className="gap-2">
        <IconSend className="w-4 h-4" />
        Send
      </Button>
    </form>
  );
}
