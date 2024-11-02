CREATE TABLE IF NOT EXISTS "todo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"createdAt" date DEFAULT now(),
	"isDone" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email" text;