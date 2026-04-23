CREATE TABLE "conversation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"participant_one_id" text NOT NULL,
	"participant_two_id" text NOT NULL,
	"last_message_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"sender_id" text,
	"content" text NOT NULL,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_participant_one_id_user_id_fk" FOREIGN KEY ("participant_one_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_participant_two_id_user_id_fk" FOREIGN KEY ("participant_two_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_conversation_id_conversation_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "conversation_participant_one_id_idx" ON "conversation" USING btree ("participant_one_id");--> statement-breakpoint
CREATE INDEX "conversation_participant_two_id_idx" ON "conversation" USING btree ("participant_two_id");--> statement-breakpoint
CREATE UNIQUE INDEX "conversation_participants_unique" ON "conversation" USING btree ("participant_one_id","participant_two_id");--> statement-breakpoint
CREATE INDEX "message_conversation_id_created_at_idx" ON "message" USING btree ("conversation_id","created_at");