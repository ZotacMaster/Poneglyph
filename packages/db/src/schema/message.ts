import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, index, uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./auth";

// One row per unique pair of participants.
// participant_one_id is always the lexicographically smaller user id —
// enforced in app code before insert to prevent duplicate pairs.
export const conversation = pgTable(
  "conversation",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    participantOneId: text("participant_one_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    participantTwoId: text("participant_two_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // Denormalized — updated on every new message insert.
    // Used to sort inbox by recency without a subquery.
    lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("conversation_participant_one_id_idx").on(table.participantOneId),
    index("conversation_participant_two_id_idx").on(table.participantTwoId),
    // Prevents two rows for the same pair
    uniqueIndex("conversation_participants_unique").on(
      table.participantOneId,
      table.participantTwoId,
    ),
  ],
);

// Individual messages within a conversation.
export const message = pgTable(
  "message",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversation.id, { onDelete: "cascade" }),

    // SET NULL on delete - preserves message history if sender deletes account
    senderId: text("sender_id").references(() => user.id, { onDelete: "set null" }),

    content: text("content").notNull(),

    // Null = unread. Set when the receiver opens the conversation.
    readAt: timestamp("read_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    // Primary access pattern: all messages in a conversation, newest first
    index("message_conversation_id_created_at_idx").on(table.conversationId, table.createdAt),
  ],
);

export const conversationRelations = relations(conversation, ({ one, many }) => ({
  participantOne: one(user, {
    fields: [conversation.participantOneId],
    references: [user.id],
    relationName: "participantOne",
  }),
  participantTwo: one(user, {
    fields: [conversation.participantTwoId],
    references: [user.id],
    relationName: "participantTwo",
  }),
  messages: many(message),
}));

export const messageRelations = relations(message, ({ one }) => ({
  conversation: one(conversation, {
    fields: [message.conversationId],
    references: [conversation.id],
  }),
  sender: one(user, {
    fields: [message.senderId],
    references: [user.id],
  }),
}));
