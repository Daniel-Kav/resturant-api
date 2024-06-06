import { pgTable, serial,varchar,numeric,index, text,timestamp ,unique,integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


//adress table
export const address = pgTable("address", {
  id: serial("id").primaryKey(),
  streetAddress1: varchar("street_address_1", { length: 255 }).notNull(),
  streetAddress2: varchar("street_address_2", { length: 255 }),
  zipCode: varchar("zip_code", { length: 16 }).notNull(),
  deliveryInstructions: varchar("delivery_instructions", { length: 255 }),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  cityId: integer("city_id")
    .notNull()
    .references(() => city.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

//adress relations  
export const addressRelations = relations(address, ({ one }) => ({
  user: one(user, {
    fields: [address.userId],
    references: [user.id],
  }),
  city: one(city, {
    fields: [address.cityId], 
    references: [city.id],
  }),
}));


//category table
export const category = pgTable(
  "category",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
  }
);



//city table
export const city = pgTable(
  "city",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    stateId: integer("state_id")
      .notNull()
      .references(() => state.id),
  },
  (table) => {
    return {
      cityAk1: unique("city_ak_1").on(table.name, table.stateId),
    };
  }
);

//city relations
export const cityRelations = relations(city, ({ one }) => ({
  state: one(state, {
    fields: [city.stateId],
    references: [state.id],
  }),
}));


//comments Table
export const comment = pgTable("comment", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => order.id),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  commentText: text("comment_text").notNull(),
  isComplaint: boolean("is_complaint").notNull(),
  isPraise: boolean("is_praise").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// comments relations
export const commentRelations = relations(comment, ({ one }) => ({
  user: one(user, {
    fields: [comment.userId],
    references: [user.id],
  }),
  order: one(order, {
    fields: [comment.orderId],
    references: [order.id],
  }),
}));



//driver table
export const driver = pgTable(
  "driver",
  {
    id: serial("id").primaryKey(),
    carMake: varchar("car_make", { length: 255 }).notNull(),
    carModel: varchar("car_model", { length: 255 }).notNull(),
    carYear: integer("car_year").notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => user.id),
    online: boolean("online").notNull(),
    delivering: boolean("delivering").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  }
);

//driver relations
export const driverRelations = relations(driver, ({ one }) => ({
  user: one(user, {
    fields: [driver.userId],
    references: [user.id],
  }),
}));




//menu-item  table

export const menuItem = pgTable("menu_item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  restaurantId: integer("restaurant_id")
    .notNull()
    .references(() => restaurant.id),
  categoryId: integer("category_id")
    .notNull()
    .references(() => category.id),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  active: boolean("active").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// menu item relationships
export const menuItemRelations = relations(menuItem, ({ one }) => ({
  restaurant: one(restaurant, {
    fields: [menuItem.restaurantId],
    references: [restaurant.id],
  }),
  category: one(category, {
    fields: [menuItem.categoryId],
    references: [category.id],
  }),
}));



// making the orders table 
export const order = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurantId: integer("restaurant_id")
    .notNull()
    .references(() => restaurant.id),
  estimatedDeliveryTime: timestamp("estimated_delivery_time", {
    mode: "string",
  }).notNull(),
  actualDeliveryTime: timestamp("actual_delivery_time", { mode: "string" }),
  deliveryAddressId: integer("delivery_address_id")
    .notNull()
    .references(() => address.id),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  driverId: integer("driver_id").references(() => driver.id),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  discount: numeric("discount", { precision: 12, scale: 2 }).notNull(),
  finalPrice: numeric("final_price", { precision: 12, scale: 2 }).notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

//order relations
export const orderRelations = relations(order, ({ one, many }) => ({
  restaurant: one(restaurant, {
    fields: [order.restaurantId],
    references: [restaurant.id],
  }),
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
  driver: one(driver, {
    fields: [order.driverId],
    references: [driver.id],
  }),
  address: one(address, {
    fields: [order.deliveryAddressId],
    references: [address.id],
  }),
  orderStatuses: many(orderStatus),
}));




//order menu items table
export const orderMenuItem = pgTable("order_menu_item", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => order.id),
  menuItemId: integer("menu_item_id").notNull().references(() => menuItem.id),
  quantity: integer("quantity").notNull(),
  itemPrice: numeric("item_price", { precision: 12, scale: 2 }).notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  comment: text("comment"),
});

export const orderMenuItemRelations = relations(orderMenuItem, ({ one }) => ({
  order: one(order, {
    fields: [orderMenuItem.orderId],
    references: [order.id],
  }),
  menuItem: one(menuItem, {
    fields: [orderMenuItem.menuItemId],
    references: [menuItem.id],
  }),
}));



//ordersstatus table
export const orderStatus = pgTable("order_status", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => order.id),
  statusCatalogId: integer("status_catalog_id")
    .notNull()
    .references(() => statusCatalog.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const orderStatusRelations = relations(orderStatus, ({ one }) => ({
  order: one(order, {
    fields: [orderStatus.orderId],
    references: [order.id],
  }),
  statusCatalog: one(statusCatalog, {
    fields: [orderStatus.statusCatalogId],
    references: [statusCatalog.id],
  }),
}));



//restaurants table 
export const restaurant = pgTable(
  "restaurant",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    streetAddress: varchar("street_address", { length: 255 }).notNull(),
    zipCode: varchar("zip_code", { length: 16 }).notNull(),
    cityId: integer("city_id")
      .notNull()
      .references(() => city.id),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    nameIndex: index().on(table.name),
  })
);

export const restaurantRelations = relations(restaurant, ({ one, many }) => ({
  city: one(city, {
    fields: [restaurant.cityId],
    references: [city.id],
  }),
  menuItems: many(menuItem),
  orders: many(order),
}));


//restaurants owner table
export const restaurantOwner = pgTable(
  "restaurant_owner",
  {
    id: serial("id").primaryKey(),
    restaurantId: integer("restaurant_id")
      .notNull()
      .references(() => restaurant.id),
    ownerId: integer("owner_id")
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      unqiueOwner: unique().on(table.restaurantId, table.ownerId)
    };
  }
);




//state table
export const state = pgTable(
  "state",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    code: varchar("code", { length: 4 }).notNull().unique(),
  }
);


//states catalog table
export const statusCatalog = pgTable(
  "status_catalog",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
  }
);


//statusCatalog table
export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("contact_phone", { length: 255 }).notNull().unique(),
  phoneVerified: boolean("phone_verified").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  confirmationCode: varchar("confirmation_code", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  addresses: many(address),
  orders: many(order)
}));

