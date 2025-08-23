CREATE TABLE `application` (
	`id` int AUTO_INCREMENT NOT NULL,
	`numeroSerie` varchar(255),
	`modelo` varchar(255),
	`fabricante` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `application_id` PRIMARY KEY(`id`)
);
