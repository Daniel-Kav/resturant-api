CREATE TABLE IF NOT EXISTS "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"street_address_1" varchar(255),
	"street_address_2" varchar(255),
	"zip_code" varchar(50),
	"delivery_instructions" text,
	"user_id" integer,
	"city_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
