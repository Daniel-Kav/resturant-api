CREATE TABLE IF NOT EXISTS "cart" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"restaurant_id" integer NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"status_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"restaurant_id" integer NOT NULL,
	"cart_id" integer NOT NULL,
	"status_id" integer NOT NULL,
	"delivery_address_id" integer NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"contact_phone" varchar(20) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "comment";--> statement-breakpoint
DROP TABLE "driver";--> statement-breakpoint
DROP TABLE "orders";--> statement-breakpoint
DROP TABLE "profiles";--> statement-breakpoint
DROP TABLE "users";--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "street_address_1" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "city_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "city" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_item" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_item" ALTER COLUMN "restaurant_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_item" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_item" ALTER COLUMN "price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "menu_item" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order_menu_item" ALTER COLUMN "order_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order_menu_item" ALTER COLUMN "menu_item_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order_menu_item" ALTER COLUMN "quantity" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order_menu_item" ALTER COLUMN "price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "order_menu_item" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "restaurant_owner" ALTER COLUMN "restaurant_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "restaurant" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "state" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "status_catalog" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "status_catalog" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ADD COLUMN "state_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ADD COLUMN "postal_code" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "order_menu_item" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "order_menu_item" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "order_status" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "restaurant_owner" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "restaurant_owner" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "restaurant_owner" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "restaurant" ADD COLUMN "address_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "restaurant" ADD COLUMN "contact_phone" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "restaurant" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "state" ADD COLUMN "city_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart" ADD CONSTRAINT "cart_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_status_id_order_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."order_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_status_id_status_catalog_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."status_catalog"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_delivery_address_id_address_id_fk" FOREIGN KEY ("delivery_address_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_state_id_state_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_menu_item_id_menu_item_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_owner" ADD CONSTRAINT "restaurant_owner_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_address_id_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "state" ADD CONSTRAINT "state_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "address" DROP COLUMN IF EXISTS "zip_code";--> statement-breakpoint
ALTER TABLE "address" DROP COLUMN IF EXISTS "delivery_instructions";--> statement-breakpoint
ALTER TABLE "address" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "city" DROP COLUMN IF EXISTS "state_id";--> statement-breakpoint
ALTER TABLE "order_menu_item" DROP COLUMN IF EXISTS "item_price";--> statement-breakpoint
ALTER TABLE "order_menu_item" DROP COLUMN IF EXISTS "comment";--> statement-breakpoint
ALTER TABLE "order_status" DROP COLUMN IF EXISTS "order_id";--> statement-breakpoint
ALTER TABLE "order_status" DROP COLUMN IF EXISTS "status_catalog_id";--> statement-breakpoint
ALTER TABLE "order_status" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "restaurant_owner" DROP COLUMN IF EXISTS "owner_id";--> statement-breakpoint
ALTER TABLE "restaurant" DROP COLUMN IF EXISTS "street_address";--> statement-breakpoint
ALTER TABLE "restaurant" DROP COLUMN IF EXISTS "zip_code";--> statement-breakpoint
ALTER TABLE "restaurant" DROP COLUMN IF EXISTS "city_id";--> statement-breakpoint
ALTER TABLE "state" DROP COLUMN IF EXISTS "code";