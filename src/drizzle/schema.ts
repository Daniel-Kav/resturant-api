import { pgTable, serial, text, integer, date, decimal, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// State table
export const tableState = pgTable("state", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    code: text("code").notNull()
});

// City table
export const tableCity = pgTable("city", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    address: text("address").notNull(),
    state_id: integer("state_id").notNull().references(() => tableState.id, { onDelete: "cascade" })
});

// Restaurant table
export const tableRestaurant = pgTable("restaurant", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    street_address: text("street_address").notNull(),
    zip_code: text("zip_code").notNull(),
    created_at: date("created_at").notNull(),
    updated_at: date("updated_at").notNull(),
    city_id: integer("city_id").notNull().references(() => tableCity.id, { onDelete: "cascade" })
});

// Category table
export const tableCategory = pgTable("category", {
    id: serial("id").primaryKey(),
    name: text("name").notNull()
});

// Menu Item table
export const tableMenuItem = pgTable("menu_item", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    ingredients: text("ingredients").notNull(),
    price: decimal("price").notNull(),
    active: boolean("active").notNull(),
    created_at: date("created_at").notNull(),
    updated_at: date("updated_at").notNull(),
    restaurant_id: integer("restaurant_id").notNull().references(() => tableRestaurant.id, { onDelete: "cascade" }),
    category_id: integer("category_id").notNull().references(() => tableCategory.id, { onDelete: "cascade" })
});

// Status Catalog table
export const tableStatusCatalog = pgTable("status_catalog", {
    id: serial("id").primaryKey(),
    name: text("name").notNull()
});

// Users table
export const tableUsers = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    contact_phone: text("contact_phone").notNull(),
    phone_verified: boolean("phone_verified").notNull(),
    email: text("email").notNull(),
    email_verified: boolean("email_verified").notNull(),
    confirmation_code: text("confirmation_code"),
    password: text("password").notNull(),
    created_at: date("created_at").notNull(),
    updated_at: date("updated_at").notNull()
});

// Driver table
export const tableDriver = pgTable("driver", {
    id: serial("id").primaryKey(),
    car_make: text("car_make").notNull(),
    car_model: text("car_model").notNull(),
    car_year: integer("car_year").notNull(),
    online: boolean("online").notNull(),
    delivering: boolean("delivering").notNull(),
    created_at: date("created_at").notNull(),
    updated_at: date("updated_at").notNull(),
    user_id: integer("user_id").notNull().references(() => tableUsers.id, { onDelete: "cascade" })
});

// Restaurant Owner table
export const tableRestaurantOwner = pgTable("restaurant_owner", {
    id: serial("id").primaryKey(),
    owner_id: integer("owner_id").notNull().references(() => tableUsers.id, { onDelete: "cascade" }),
    restaurant_id: integer("restaurant_id").notNull().references(() => tableRestaurant.id, { onDelete: "cascade" })
});

// Address table
export const tableAddress = pgTable("address", {
    id: serial("id").primaryKey(),
    street_address_1: text("street_address_1").notNull(),
    street_address_2: text("street_address_2"),
    description: text("description"),
    zip_code: text("zip_code").notNull(),
    delivery_instructions: text("delivery_instructions"),
    created_at: date("created_at").notNull(),
    updated_at: date("updated_at").notNull(),
    city_id: integer("city_id").notNull().references(() => tableCity.id, { onDelete: "cascade" }),
    user_id: integer("user_id").notNull().references(() => tableUsers.id, { onDelete: "cascade" })
});

// Orders table
export const tableOrders = pgTable("orders", {
    id: serial("id").primaryKey(),
    estimated_delivery_time: date("estimated_delivery_time"),
    actual_delivery_time: date("actual_delivery_time"),
    price: decimal("price").notNull(),
    discount: decimal("discount"),
    final_price: decimal("final_price").notNull(),
    comment: text("comment"),
    created_at: date("created_at").notNull(),
    updated_at: date("updated_at").notNull(),
    restaurant_id: integer("restaurant_id").notNull().references(() => tableRestaurant.id, { onDelete: "cascade" }),
    delivery_address_id: integer("delivery_address_id").notNull().references(() => tableAddress.id, { onDelete: "cascade" }),
    user_id: integer("user_id").notNull().references(() => tableUsers.id, { onDelete: "cascade" }),
    driver_id: integer("driver_id").notNull().references(() => tableDriver.id, { onDelete: "cascade" })
});

// Order Status table
export const tableOrderStatus = pgTable("order_status", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").notNull().references(() => tableOrders.id, { onDelete: "cascade" }),
    status_catalog_id: integer("status_catalog_id").notNull().references(() => tableStatusCatalog.id, { onDelete: "cascade" })
});

// Comment table
export const tableComment = pgTable("comment", {
    id: serial("id").primaryKey(),
    comment_text: text("comment_text").notNull(),
    is_complaint: boolean("is_complaint").notNull(),
    is_praise: boolean("is_praise").notNull(),
    created_at: date("created_at").notNull(),
    updated_at: date("updated_at").notNull(),
    order_id: integer("order_id").notNull().references(() => tableOrders.id, { onDelete: "cascade" }),
    user_id: integer("user_id").notNull().references(() => tableUsers.id, { onDelete: "cascade" })
});

// Order Menu Item table
export const tableOrderMenuItem = pgTable("order_menu_item", {
    id: serial("id").primaryKey(),
    quantity: integer("quantity").notNull(),
    item_price: decimal("item_price").notNull(),
    price: decimal("price").notNull(),
    comment: text("comment"),
    order_id: integer("order_id").notNull().references(() => tableOrders.id, { onDelete: "cascade" }),
    menu_item_id: integer("menu_item_id").notNull().references(() => tableMenuItem.id, { onDelete: "cascade" })
});

// Relationships

// State - City (1-* relationship)
export const stateCityRelation = relations(tableState, ({ one, many }) => ({
    cities: many(tableCity)
}));
export const cityStateRelation = relations(tableCity, ({ one }) => ({
    state: one(tableState, {
        fields: [tableCity.state_id],
        references: [tableState.id]
    })
}));

// City - Restaurant (1-* relationship)
export const cityRestaurantRelation = relations(tableCity, ({ one, many }) => ({
    restaurants: many(tableRestaurant)
}));
export const restaurantCityRelation = relations(tableRestaurant, ({ one }) => ({
    city: one(tableCity, {
        fields: [tableRestaurant.city_id],
        references: [tableCity.id]
    })
}));

// City - Address (1-* relationship)
export const cityAddressRelation = relations(tableCity, ({ one, many }) => ({
    addresses: many(tableAddress)
}));
export const addressCityRelation = relations(tableAddress, ({ one }) => ({
    city: one(tableCity, {
        fields: [tableAddress.city_id],
        references: [tableCity.id]
    })
}));

// Restaurant - Menu Item (1-* relationship)
export const restaurantMenuItemRelation = relations(tableRestaurant, ({ one, many }) => ({
    menu_items: many(tableMenuItem)
}));
export const menuItemRestaurantRelation = relations(tableMenuItem, ({ one }) => ({
    restaurant: one(tableRestaurant, {
        fields: [tableMenuItem.restaurant_id],
        references: [tableRestaurant.id]
    })
}));

// Restaurant - Orders (1-* relationship)
export const restaurantOrdersRelation = relations(tableRestaurant, ({ one, many }) => ({
    orders: many(tableOrders)
}));
export const orderRestaurantRelation = relations(tableOrders, ({ one }) => ({
    restaurant: one(tableRestaurant, {
        fields: [tableOrders.restaurant_id],
        references: [tableRestaurant.id]
    })
}));

// Restaurant - Restaurant Owner (1-* relationship)
export const restaurantOwnerRelation = relations(tableRestaurant, ({ one, many }) => ({
    restaurant_owners: many(tableRestaurantOwner)
}));
export const restaurantOwnerReverseRelation = relations(tableRestaurantOwner, ({ one }) => ({
    restaurant: one(tableRestaurant, {
        fields: [tableRestaurantOwner.restaurant_id],
        references: [tableRestaurant.id]
    }),
    owner: one(tableUsers, {
        fields: [tableRestaurantOwner.owner_id],
        references: [tableUsers.id]
    })
}));

// Menu Item - Order Menu Item (1-* relationship)
export const menuItemOrderMenuItemRelation = relations(tableMenuItem, ({ one, many }) => ({
    order_menu_items: many(tableOrderMenuItem)
}));
export const orderMenuItemMenuItemRelation = relations(tableOrderMenuItem, ({ one }) => ({
    menu_item: one(tableMenuItem, {
        fields: [tableOrderMenuItem.menu_item_id],
        references: [tableMenuItem.id]
    })
}));

// Category - Menu Item (1-* relationship)
export const categoryMenuItemRelation = relations(tableCategory, ({ one, many }) => ({
    menu_items: many(tableMenuItem)
}));
export const menuItemCategoryRelation = relations(tableMenuItem, ({ one }) => ({
    category: one(tableCategory, {
        fields: [tableMenuItem.category_id],
        references: [tableCategory.id]
    })
}));

// Address - Orders (1-* relationship)
export const addressOrdersRelation = relations(tableAddress, ({ one, many }) => ({
    orders: many(tableOrders)
}));
export const orderAddressRelation = relations(tableOrders, ({ one }) => ({
    address: one(tableAddress, {
        fields: [tableOrders.delivery_address_id],
        references: [tableAddress.id]
    })
}));

// Users - Address (1-* relationship)
export const usersAddressRelation = relations(tableUsers, ({ one, many }) => ({
    addresses: many(tableAddress)
}));
export const addressUserRelation = relations(tableAddress, ({ one }) => ({
    user: one(tableUsers, {
        fields: [tableAddress.user_id],
        references: [tableUsers.id]
    })
}));

// Users - Restaurant Owner (1-* relationship)
export const usersRestaurantOwnerRelation = relations(tableUsers, ({ one, many }) => ({
    restaurant_owners: many(tableRestaurantOwner)
}));

// Users - Driver (1-* relationship)
export const usersDriverRelation = relations(tableUsers, ({ one, many }) => ({
    drivers: many(tableDriver)
}));
export const driverUserRelation = relations(tableDriver, ({ one }) => ({
    user: one(tableUsers, {
        fields: [tableDriver.user_id],
        references: [tableUsers.id]
    })
}));

// Users - Orders (1-* relationship)
export const usersOrdersRelation = relations(tableUsers, ({ one, many }) => ({
    orders: many(tableOrders)
}));
export const orderUserRelation = relations(tableOrders, ({ one }) => ({
    user: one(tableUsers, {
        fields: [tableOrders.user_id],
        references: [tableUsers.id]
    })
}));

// Users - Comments (1-* relationship)
export const usersCommentsRelation = relations(tableUsers, ({ one, many }) => ({
    comments: many(tableComment)
}));
export const commentUserRelation = relations(tableComment, ({ one }) => ({
    user: one(tableUsers, {
        fields: [tableComment.user_id],
        references: [tableUsers.id]
    })
}));

// Driver - Orders (1-* relationship)
export const driverOrdersRelation = relations(tableDriver, ({ one, many }) => ({
    orders: many(tableOrders)
}));
export const orderDriverRelation = relations(tableOrders, ({ one }) => ({
    driver: one(tableDriver, {
        fields: [tableOrders.driver_id],
        references: [tableDriver.id]
    })
}));

// Orders - Comments (1-* relationship)
export const ordersCommentsRelation = relations(tableOrders, ({ one, many }) => ({
    comments: many(tableComment)
}));
export const commentOrderRelation = relations(tableComment, ({ one }) => ({
    order: one(tableOrders, {
        fields: [tableComment.order_id],
        references: [tableOrders.id]
    })
}));

// Orders - Order Status (1-* relationship)
export const ordersOrderStatusRelation = relations(tableOrders, ({ one, many }) => ({
    order_statuses: many(tableOrderStatus)
}));
export const orderStatusOrderRelation = relations(tableOrderStatus, ({ one }) => ({
    order: one(tableOrders, {
        fields: [tableOrderStatus.order_id],
        references: [tableOrders.id]
    })
}));

// Orders - Order Menu Item (1-* relationship)
export const ordersOrderMenuItemRelation = relations(tableOrders, ({ one, many }) => ({
    order_menu_items: many(tableOrderMenuItem)
}));
export const orderMenuItemOrderRelation = relations(tableOrderMenuItem, ({ one }) => ({
    order: one(tableOrders, {
        fields: [tableOrderMenuItem.order_id],
        references: [tableOrders.id]
    })
}));

// Status Catalog - Order Status (1-* relationship)
export const statusCatalogOrderStatusRelation = relations(tableStatusCatalog, ({ one, many }) => ({
    order_statuses: many(tableOrderStatus)
}));
export const orderStatusStatusCatalogRelation = relations(tableOrderStatus, ({ one }) => ({
    status_catalog: one(tableStatusCatalog, {
        fields: [tableOrderStatus.status_catalog_id],
        references: [tableStatusCatalog.id]
    })
}));

