import { Context } from "hono";
import { restaurantService } from "./restaurant.service";

export const listRestaurants = async (c: Context) => {
  const data = await restaurantService.list();
  if (!data || data.length === 0) {
    return c.text("No restaurants found", 404);
  }
  return c.json(data, 200);
};

export const getRestaurantById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await restaurantService.getById(Number(id));
  if (!data) {
    return c.text("Restaurant not found", 404);
  }
  return c.json(data, 200);
};

export const createRestaurant = async (c: Context) => {
  const restaurant = await c.req.json();
  const newRestaurant = await restaurantService.create(restaurant);
  return c.json(newRestaurant, 201);
};

export const updateRestaurant = async (c: Context) => {
  const id = c.req.param("id");
  const restaurant = await c.req.json();
  const updatedRestaurant = await restaurantService.update(
    Number(id),
    restaurant
  );
  if (!updatedRestaurant) {
    return c.text("Restaurant not found", 404);
  }
  return c.json(updatedRestaurant, 200);
};

export const deleteRestaurant = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await restaurantService.delete(Number(id));
  if (!deleted) {
    return c.text("Restaurant not found", 404);
  }
  return c.text("Restaurant deleted", 200);
};
