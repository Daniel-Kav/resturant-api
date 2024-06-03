// import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";
import { pgTable, serial, text, varchar, integer, boolean, decimal, timestamp } from 'drizzle-orm/pg-core';


//user table
export const UsersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    fullname: text("full_name"),
    phone: varchar("phone", { length: 100 }),
    address: varchar("address", { length: 100 }),
    score: integer("score"),
})

export const ProfilesTable = pgTable("profiles", {
    id: serial("id").primaryKey(),
    bio: varchar("bio", { length: 256 }),
    userId: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }), //fk ref id in users table
});

export const AddressTable = pgTable('address', {
    id: serial('id').primaryKey(),
    street_address_1: varchar('street_address_1', {length: 255}),
    street_address_2: varchar('street_address_2', {length: 255}),
    zip_code: varchar('zip_code', {length: 50}),
    delivery_instructions: text('delivery_instructions'),
    user_id: integer('user_id'),
    city_id: integer('city_id'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});


export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;
export type TIProfile = typeof ProfilesTable.$inferInsert;
export type TSProfile = typeof ProfilesTable.$inferSelect;