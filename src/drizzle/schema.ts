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


//resturant db relations
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

export const CategoryTable = pgTable('category', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255})
});

export const CityTable = pgTable('city', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255}),
    state_id: integer('state_id')
});

export const CommentTable = pgTable('comment', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id'),
    user_id: integer('user_id'),
    comment_text: text('comment_text'),
    is_complaint: boolean('is_complaint').default(false),
    is_praise: boolean('is_praise').default(false),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const DriverTable = pgTable('driver', {
    id: serial('id').primaryKey(),
    car_make: varchar('car_make', { length: 50}),
    car_model: varchar('car_model', {length: 50}),
    car_year: integer('car_year'),
    user_id: integer('user_id'),
    online: boolean('online').default(false),
    delivering: boolean('delivering').default(false),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const MenuItemTable = pgTable('menu_item', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length: 255}),
    restaurant_id: integer('restaurant_id'),
    category_id: integer('category_id'),
    description: text('description'),
    ingredients: text('ingredients'),
    price: decimal('price', { precision: 2}),
    active: boolean('active').default(true),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const OrderMenuItemTable = pgTable('order_menu_item', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id'),
    menu_item_id: integer('menu_item_id'),
    quantity: integer('quantity'),
    item_price: decimal('item_price', {precision: 2}),
    price: decimal('price', {precision: 2}),
    comment: text('comment')
});

export const OrderStatusTable = pgTable('order_status', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id'),
    status_catalog_id: integer('status_catalog_id'),
    created_at: timestamp('created_at').defaultNow()
});

export const OrdersTable = pgTable('orders', {
    id: serial('id').primaryKey(),
    restaurant_id: integer('restaurant_id'),
    estimated_delivery_time: timestamp('estimated_delivery_time'),
    actual_delivery_time: timestamp('actual_delivery_time'),
    delivery_address_id: integer('delivery_address_id'),
    user_id: integer('user_id'),
    driver_id: integer('driver_id'),
    price: decimal('price', {precision: 2}),
    discount: decimal('discount', {precision: 2}),
    final_price: decimal('final_price', {precision: 2}),
    comment: text('comment'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const RestaurantTable = pgTable('restaurant', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255}),
    street_address: varchar('street_address', { length: 255 }),
    zip_code: varchar('zip_code', { length: 100}),
    city_id: integer('city_id'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const StateTable = pgTable('state', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length: 255}),
    code: varchar('code', {length: 255}),
});

export const StatusCatalogTable = pgTable('status_catalog', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length: 250})
});

export const UserTable = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length: 255}),
    contact_phone: varchar('contact_phone', {length: 50}),
    phone_verified: boolean('phone_verified').default(false),
    email: varchar('email', {length: 255}),
    email_verified: boolean('email_verified').default(false),
    confirmation_code: varchar('confirmation_code', { length: 255 }),
    password: varchar('password', {length: 255}),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const RestaurantOwnerTable = pgTable('restaurant_owner', {
    id: serial('id').primaryKey(),
    restaurant_id: integer('restaurant_id'),
    owner_id: integer('owner_id')
});




export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;
export type TIProfile = typeof ProfilesTable.$inferInsert;
export type TSProfile = typeof ProfilesTable.$inferSelect;