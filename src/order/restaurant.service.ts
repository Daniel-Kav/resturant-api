import db from "../drizzle/db";
import { restaurantTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const restaurantService = {
  list: async () => {
    return await db.select().from(restaurantTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(restaurantTable)
      .where(eq(restaurantTable.id, id))
      .execute();
  },
  create: async (restaurant: any) => {
    return await db
      .insert(restaurantTable)
      .values(restaurant)
      .returning()
      .execute();
  },
  update: async (id: number, restaurant: any) => {
    return await db
      .update(restaurantTable)
      .set(restaurant)
      .where(eq(restaurantTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(restaurantTable)
      .where(eq(restaurantTable.id, id))
      .execute();
  },
};
