import { pgTable, serial, text, varchar, integer, decimal, boolean, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export const CityTable = pgTable('city', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const StateTable = pgTable('state', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  city_id: integer('city_id').references(() => CityTable.id).notNull(),
});



export const staterelations = relations(StateTable, ({ one }) => ({
  city: one(CityTable, { fields: [StateTable.city_id], references: [CityTable.id] }),
}));


// Address Table
export const AddressTable = pgTable('address', {
    id: serial('id').primaryKey(),
    street_address_1: varchar('street_address_1', { length: 255 }).notNull(),
    street_address_2: varchar('street_address_2', { length: 255 }),
    city_id: integer('city_id').references(() => CityTable.id).notNull(),
    state_id: integer('state_id').references(() => StateTable.id).notNull(),
    postal_code: varchar('postal_code', { length: 20 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Restaurant Table
export const RestaurantTable = pgTable('restaurant', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    address_id: integer('address_id').references(() => AddressTable.id).notNull(),
    contact_phone: varchar('contact_phone', { length: 20 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// RestaurantOwner Table
export const RestaurantOwnerTable = pgTable('restaurant_owner', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    restaurant_id: integer('restaurant_id').references(() => RestaurantTable.id).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// User Table
export const UserTable = pgTable('user', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    contact_phone: varchar('contact_phone', { length: 20 }).notNull(),
    password_hash: varchar('password_hash', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Category Table
export const CategoryTable = pgTable('category', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
});

// MenuItem Table
export const MenuItemTable = pgTable('menu_item', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    restaurant_id: integer('restaurant_id').references(() => RestaurantTable.id).notNull(),
    category_id: integer('category_id').references(() => CategoryTable.id).notNull(),
    description: text('description'),
    ingredients: text('ingredients'),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    active: boolean('active').default(true),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Order Table
export const OrderTable = pgTable('order', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => UserTable.id).notNull(),
    restaurant_id: integer('restaurant_id').references(() => RestaurantTable.id).notNull(),
    cart_id: integer('cart_id').references(() => CartTable.id).notNull(),
    status_id: integer('status_id').references(() => StatusCatalogTable.id).notNull(),
    delivery_address_id: integer('delivery_address_id').references(() => AddressTable.id).notNull(),
    total_price: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// OrderMenuItem Table
export const OrderMenuItemTable = pgTable('order_menu_item', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').references(() => OrderTable.id).notNull(),
    menu_item_id: integer('menu_item_id').references(() => MenuItemTable.id).notNull(),
    quantity: integer('quantity').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// Cart Table
export const CartTable = pgTable('cart', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(() => UserTable.id).notNull(),
    restaurant_id: integer('restaurant_id').references(() => RestaurantTable.id).notNull(),
    total_price: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// OrderStatus Table
export const OrderStatusTable = pgTable('order_status', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
});

// OrderDetails Table
export const OrderDetailsTable = pgTable('order_details', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').references(() => OrderTable.id).notNull(),
    status_id: integer('status_id').references(() => OrderStatusTable.id).notNull(),
    updated_at: timestamp('updated_at').defaultNow(),
});

// StatusCatalog Table
export const StatusCatalogTable = pgTable('status_catalog', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
});

// Relationships
export const cityRelations = relations(CityTable, ({ many }) => ({
    states: many(StateTable),
    addresses: many(AddressTable),
}));

export const stateRelations = relations(StateTable, ({ many, one }) => ({
    city: one(CityTable, {
        fields: [StateTable.city_id],
        references: [CityTable.id],
    }),
    addresses: many(AddressTable),
}));

export const addressRelations = relations(AddressTable, ({ many, one }) => ({
    city: one(CityTable, {
        fields: [AddressTable.city_id],
        references: [CityTable.id],
    }),
    state: one(StateTable, {
        fields: [AddressTable.state_id],
        references: [StateTable.id],
    }),
    restaurants: many(RestaurantTable),
    orders: many(OrderTable),
}));

export const restaurantRelations = relations(RestaurantTable, ({ one, many }) => ({
    address: one(AddressTable, {
        fields: [RestaurantTable.address_id],
        references: [AddressTable.id],
    }),
    owner: one(RestaurantOwnerTable),
    menuItems: many(MenuItemTable),
    orders: many(OrderTable),
    carts: many(CartTable),
}));

export const restaurantOwnerRelations = relations(RestaurantOwnerTable, ({ one }) => ({
    restaurant: one(RestaurantTable, {
        fields: [RestaurantOwnerTable.restaurant_id],
        references: [RestaurantTable.id],
    }),
}));

export const userRelations = relations(UserTable, ({ many }) => ({
    orders: many(OrderTable),
    carts: many(CartTable),
}));

export const categoryRelations = relations(CategoryTable, ({ many }) => ({
    menuItems: many(MenuItemTable),
}));

export const menuItemRelations = relations(MenuItemTable, ({ one, many }) => ({
    restaurant: one(RestaurantTable, {
        fields: [MenuItemTable.restaurant_id],
        references: [RestaurantTable.id],
    }),
    category: one(CategoryTable, {
        fields: [MenuItemTable.category_id],
        references: [CategoryTable.id],
    }),
    orderMenuItems: many(OrderMenuItemTable),
}));

export const orderRelations = relations(OrderTable, ({ one, many }) => ({
    user: one(UserTable, {
        fields: [OrderTable.user_id],
        references: [UserTable.id],
    }),
    restaurant: one(RestaurantTable, {
        fields: [OrderTable.restaurant_id],
        references: [RestaurantTable.id],
    }),
    cart: one(CartTable, {
        fields: [OrderTable.cart_id],
        references: [CartTable.id],
    }),
    deliveryAddress: one(AddressTable, {
        fields: [OrderTable.delivery_address_id],
        references: [AddressTable.id],
    }),
    status: one(StatusCatalogTable, {
        fields: [OrderTable.status_id],
        references: [StatusCatalogTable.id],
    }),
    orderMenuItems: many(OrderMenuItemTable),
}));

export const orderMenuItemRelations = relations(OrderMenuItemTable, ({ one }) => ({
    order: one(OrderTable, {
        fields: [OrderMenuItemTable.order_id],
        references: [OrderTable.id],
    }),
    menuItem: one(MenuItemTable, {
        fields: [OrderMenuItemTable.menu_item_id],
        references: [MenuItemTable.id],
    }),
}));

export const cartRelations = relations(CartTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [CartTable.user_id],
        references: [UserTable.id],
    }),
    restaurant: one(RestaurantTable, {
        fields: [CartTable.restaurant_id],
        references: [RestaurantTable.id],
    }),
}));

export const orderStatusRelations = relations(OrderStatusTable, ({ many }) => ({
    orderDetails: many(OrderDetailsTable),
}));

export const orderDetailsRelations = relations(OrderDetailsTable, ({ one }) => ({
    order: one(OrderTable, {
        fields: [OrderDetailsTable.order_id],
        references: [OrderTable.id],
    }),
    status: one(OrderStatusTable, {
        fields: [OrderDetailsTable.status_id],
        references: [OrderStatusTable.id],
    }),
}));

export const statusCatalogRelations = relations(StatusCatalogTable, ({ many }) => ({
    orders: many(OrderTable),
}));

export type TICity = typeof CityTable.$inferInsert;
export type TSCity = typeof CityTable.$inferSelect;

export type TIState = typeof StateTable.$inferInsert;
export type TSState = typeof StateTable.$inferSelect;

export type TIAddress = typeof AddressTable.$inferInsert;
export type TSAddress = typeof AddressTable.$inferSelect;

export type TIRestaurant = typeof RestaurantTable.$inferInsert;
export type TSRestaurant = typeof RestaurantTable.$inferSelect;

export type TIRestaurantOwner = typeof RestaurantOwnerTable.$inferInsert;
export type TSRestaurantOwner = typeof RestaurantOwnerTable.$inferSelect;

export type TIUser = typeof UserTable.$inferInsert;
export type TSUser = typeof UserTable.$inferSelect;

export type TICategory = typeof CategoryTable.$inferInsert;
export type TSCategory = typeof CategoryTable.$inferSelect;

export type TIMenuItem = typeof MenuItemTable.$inferInsert;
export type TSMenuItem = typeof MenuItemTable.$inferSelect;

export type TIOrder = typeof OrderTable.$inferInsert;
export type TSOrder = typeof OrderTable.$inferSelect;

export type TIOrderMenuItem = typeof OrderMenuItemTable.$inferInsert;
export type TSOrderMenuItem = typeof OrderMenuItemTable.$inferSelect;

export type TICart = typeof CartTable.$inferInsert;
export type TSCart = typeof CartTable.$inferSelect;

export type TIOrderStatus = typeof OrderStatusTable.$inferInsert;
export type TSOrderStatus = typeof OrderStatusTable.$inferSelect;

export type TIOrderDetails = typeof OrderDetailsTable.$inferInsert;
export type TSOrderDetails = typeof OrderDetailsTable.$inferSelect;

export type TIStatusCatalog = typeof StatusCatalogTable.$inferInsert;
export type TSStatusCatalog = typeof StatusCatalogTable.$inferSelect;
