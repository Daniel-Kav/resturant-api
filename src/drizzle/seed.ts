import { faker } from '@faker-js/faker';
import  db  from './db'; // Adjust the import according to your project structure
import { 
  UsersTable, ProfilesTable, AddressTable, CategoryTable, CityTable, CommentTable, DriverTable, MenuItemTable, 
  OrderMenuItemTable, OrderStatusTable, OrdersTable, RestaurantTable, StateTable, StatusCatalogTable, 
  RestaurantOwnerTable 
} from './schema'; // Adjust the import according to your project structure

const seedData = async () => {
  // Seed Users
  const users = Array.from({ length: 10 }).map(() => ({
    fullname: faker.person.fullName(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    score: faker.datatype.number({ min: 0, max: 100 }),
  }));

  const userIds = await Promise.all(users.map(async (user) => {
    const result = await db.insert(UsersTable).values(user).returning();
    return result[0].id;
  }));

  // Seed Profiles
  const profiles = userIds.map((userId) => ({
    bio: faker.lorem.sentence(),
    user_id: userId,
  }));

  await Promise.all(profiles.map((profile) => db.insert(ProfilesTable).values(profile)));

  // Seed Address
  const addresses = await Promise.all(userIds.map(async (userId) => {
    const address = {
      street_address_1: faker.location.streetAddress(),
      street_address_2: faker.location.secondaryAddress(),
      zip_code: faker.location.zipCode(),
      delivery_instructions: faker.lorem.sentence(),
      user_id: userId,
      city_id: faker.datatype.number({ min: 1, max: 10 }), // Assuming city_id is in the range 1-10
    };
    const result = await db.insert(AddressTable).values(address).returning();
    return { ...address, id: result[0].id };
  }));

  // Seed Category
  const categories = Array.from({ length: 5 }).map(() => ({
    name: faker.commerce.department(),
  }));

  const categoryIds = await Promise.all(categories.map(async (category) => {
    const result = await db.insert(CategoryTable).values(category).returning();
    return result[0].id;
  }));

  // Seed City
  const cities = Array.from({ length: 10 }).map(() => ({
    name: faker.location.city(),
    state_id: faker.datatype.number({ min: 1, max: 5 }), // Assuming state_id is in the range 1-5
  }));

  const cityIds = await Promise.all(cities.map(async (city) => {
    const result = await db.insert(CityTable).values(city).returning();
    return result[0].id;
  }));

  // Seed Comment
  const comments = Array.from({ length: 20 }).map(() => ({
    order_id: faker.datatype.number({ min: 1, max: 10 }), // Assuming order_id is in the range 1-10
    user_id: faker.helpers.arrayElement(userIds),
    comment_text: faker.lorem.sentences(),
    is_complaint: faker.datatype.boolean(),
    is_praise: faker.datatype.boolean(),
  }));

  await Promise.all(comments.map((comment) => db.insert(CommentTable).values(comment)));

  // Seed Driver
  const drivers = Array.from({ length: 5 }).map(() => ({
    car_make: faker.vehicle.manufacturer(),
    car_model: faker.vehicle.model(),
    car_year: faker.datatype.number({ min: 2000, max: 2023 }),
    user_id: faker.helpers.arrayElement(userIds),
    online: faker.datatype.boolean(),
    delivering: faker.datatype.boolean(),
  }));

  await Promise.all(drivers.map((driver) => db.insert(DriverTable).values(driver)));

  // Seed Menu Items
  const menuItems = Array.from({ length: 20 }).map(() => ({
    name: faker.commerce.productName(),
    restaurant_id: faker.datatype.number({ min: 1, max: 5 }), // Assuming restaurant_id is in the range 1-5
    category_id: faker.helpers.arrayElement(categoryIds),
    description: faker.lorem.paragraph(),
    ingredients: faker.lorem.words(10),
    price: faker.commerce.price(), // Change to string
    active: faker.datatype.boolean(),
  }));

  await Promise.all(menuItems.map((item) => db.insert(MenuItemTable).values(item)));

  // Seed Orders
  const orders = Array.from({ length: 15 }).map(() => ({
    restaurant_id: faker.datatype.number({ min: 1, max: 5 }), // Assuming restaurant_id is in the range 1-5
    estimated_delivery_time: faker.date.future(),
    actual_delivery_time: faker.date.future(),
    delivery_address_id: faker.helpers.arrayElement(addresses).id,
    user_id: faker.helpers.arrayElement(userIds),
    driver_id: faker.datatype.number({ min: 1, max: 5 }), // Assuming driver_id is in the range 1-5
    price: faker.commerce.price(), // Change to string
    discount: faker.commerce.price(), // Change to string
    final_price: faker.commerce.price(), // Change to string
    comment: faker.lorem.sentence(),
  }));

  const orderIds = await Promise.all(orders.map(async (order) => {
    const result = await db.insert(OrdersTable).values(order).returning();
    return result[0].id;
  }));

  // Seed Order Menu Items
  const orderMenuItems = Array.from({ length: 50 }).map(() => ({
    order_id: faker.helpers.arrayElement(orderIds),
    menu_item_id: faker.datatype.number({ min: 1, max: 20 }), // Assuming menu_item_id is in the range 1-20
    quantity: faker.datatype.number({ min: 1, max: 5 }),
    item_price: faker.commerce.price(), // Change to string
    price: faker.commerce.price(), // Change to string
    comment: faker.lorem.sentence(),
  }));

  await Promise.all(orderMenuItems.map((item) => db.insert(OrderMenuItemTable).values(item)));

  // Seed Order Status
  const orderStatuses = orderIds.map((orderId) => ({
    order_id: orderId,
    status_catalog_id: faker.datatype.number({ min: 1, max: 3 }), // Assuming status_catalog_id is in the range 1-3
  }));

  await Promise.all(orderStatuses.map((status) => db.insert(OrderStatusTable).values(status)));

  // Seed Restaurant
  const restaurants = Array.from({ length: 5 }).map(() => ({
    name: faker.company.name(),
    street_address: faker.location.streetAddress(),
    zip_code: faker.location.zipCode(),
    city_id: faker.helpers.arrayElement(cityIds),
  }));

  const restaurantIds = await Promise.all(restaurants.map(async (restaurant) => {
    const result = await db.insert(RestaurantTable).values(restaurant).returning();
    return result[0].id;
  }));

  // Seed State
  const states = Array.from({ length: 5 }).map(() => ({
    name: faker.location.state(),
    code: faker.location.stateAbbr(),
  }));

  await Promise.all(states.map((state) => db.insert(StateTable).values(state)));

  // Seed Status Catalog
  const statusCatalogs = Array.from({ length: 3 }).map(() => ({
    name: faker.lorem.word(),
  }));

  await Promise.all(statusCatalogs.map((status) => db.insert(StatusCatalogTable).values(status)));

  // Seed Restaurant Owner
  const restaurantOwners = restaurantIds.map((restaurantId) => ({
    restaurant_id: restaurantId,
    owner_id: faker.helpers.arrayElement(userIds),
  }));

  await Promise.all(restaurantOwners.map((owner) => db.insert(RestaurantOwnerTable).values(owner)));

  console.log('Seeding completed.');
};

seedData().catch((error) => {
  console.error('Error seeding data:', error);
});
