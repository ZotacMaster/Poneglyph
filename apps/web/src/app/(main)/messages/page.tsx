import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@Poneglyph/ui/components/avatar";
import { Badge } from "@Poneglyph/ui/components/badge";
import { format } from "date-fns";

// Static mock conversations
const STATIC_CONVERSATIONS = [
  {
    id: "conv-1",
    otherUser: { id: "user-2", name: "Jane Volunteer", image: null },
    lastMessageContent: "Thanks for reaching out! Happy to chat about potential collaboration.",
    lastMessageAt: new Date().toISOString(),
    unreadCount: 0,
  },
];

export default async function MessagesInboxPage() {
  const conversations = STATIC_CONVERSATIONS;

  if (conversations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-8">Messages</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground">No conversations yet</p>
          <p className="text-sm text-muted-foreground mt-2">
            Go to{" "}
            <Link href="/discover" className="text-primary hover:underline">
              Discover
            </Link>{" "}
            to find volunteers and start a conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Messages</h1>

      <div className="space-y-2">
        {conversations.map((conv) => (
          <Link
            key={conv.id}
            href={`/messages/${conv.id}`}
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src={conv.otherUser?.image || ""} />
              <AvatarFallback>{conv.otherUser?.name?.[0] || "?"}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  {conv.otherUser?.name || "Unknown"}
                </h3>
                {conv.unreadCount > 0 && (
                  <Badge variant="default" className="ml-auto">
                    {conv.unreadCount}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {conv.lastMessageContent || "(no messages yet)"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(conv.lastMessageAt), "MMM d, h:mm a")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
