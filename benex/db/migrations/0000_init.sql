CREATE TABLE `campaigns` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`channel` varchar(120) NOT NULL,
	`objective` text,
	`status` enum('draft','active','paused','completed') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `campaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `caseStudies` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`slug` varchar(180) NOT NULL,
	`titleFr` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`summaryFr` text NOT NULL,
	`summaryEn` text NOT NULL,
	`clientPermission` boolean NOT NULL DEFAULT false,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `caseStudies_id` PRIMARY KEY(`id`),
	CONSTRAINT `caseStudies_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `clientItems` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`organizationId` bigint unsigned NOT NULL,
	`projectId` bigint unsigned,
	`type` enum('milestone','proposal','document','report','kpi','invoice','recommendation','message') NOT NULL,
	`title` varchar(255) NOT NULL,
	`body` text,
	`status` varchar(80),
	`value` varchar(120),
	`fileKey` varchar(120),
	`fileName` varchar(255),
	`fileMime` varchar(120),
	`fileSize` int,
	`dueDate` varchar(10),
	`author` enum('benex','client') NOT NULL DEFAULT 'benex',
	`authorUserId` bigint unsigned,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `clientItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `integrationEvents` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`channel` varchar(40) NOT NULL,
	`event` varchar(80) NOT NULL,
	`refId` varchar(60),
	`status` enum('not_configured','delivered','failed') NOT NULL,
	`detail` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `integrationEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`reference` varchar(24) NOT NULL,
	`mode` enum('contact','diagnostic','quote','appointment','newsletter') NOT NULL,
	`status` enum('new','in_progress','qualified','quoted','scheduled','won','closed','archived') NOT NULL DEFAULT 'new',
	`name` varchar(255),
	`email` varchar(320) NOT NULL,
	`company` varchar(255),
	`phone` varchar(50),
	`sector` varchar(120),
	`budget` varchar(80),
	`currentSituation` text,
	`objectives` text,
	`challenges` text,
	`message` text,
	`services` json,
	`solution` varchar(80),
	`engagementType` varchar(40),
	`preferredDate` varchar(10),
	`timeSlot` varchar(40),
	`confirmedAt` varchar(40),
	`internalNotes` text,
	`consent` boolean NOT NULL,
	`consentAt` timestamp NOT NULL DEFAULT (now()),
	`consentTextVersion` varchar(40) NOT NULL,
	`locale` varchar(5) NOT NULL DEFAULT 'fr',
	`unsubscribedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`),
	CONSTRAINT `leads_reference_unique` UNIQUE(`reference`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`leadId` bigint unsigned,
	`message` varchar(500) NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `organizations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`slug` varchar(180) NOT NULL,
	`titleFr` varchar(255) NOT NULL,
	`titleEn` varchar(255) NOT NULL,
	`excerptFr` text NOT NULL,
	`excerptEn` text NOT NULL,
	`bodyFr` text NOT NULL,
	`bodyEn` text NOT NULL,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`organizationId` bigint unsigned NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`status` enum('planning','active','on_hold','completed') NOT NULL DEFAULT 'planning',
	`startDate` varchar(10),
	`endDate` varchar(10),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `solutionContent` (
	`slug` varchar(100) NOT NULL,
	`nameFr` varchar(255) NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`summaryFr` text NOT NULL,
	`summaryEn` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `solutionContent_slug` PRIMARY KEY(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` enum('client','admin') NOT NULL DEFAULT 'client',
	`organizationId` bigint unsigned,
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`lastSignInAt` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `items_org_idx` ON `clientItems` (`organizationId`);--> statement-breakpoint
CREATE INDEX `leads_mode_idx` ON `leads` (`mode`);--> statement-breakpoint
CREATE INDEX `leads_email_idx` ON `leads` (`email`);--> statement-breakpoint
CREATE INDEX `projects_org_idx` ON `projects` (`organizationId`);--> statement-breakpoint
CREATE INDEX `users_org_idx` ON `users` (`organizationId`);