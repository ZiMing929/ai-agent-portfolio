CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`role` text NOT NULL,
	`status` text NOT NULL,
	`href` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`hidden` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL
);
