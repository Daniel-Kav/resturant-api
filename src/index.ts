import db from "./drizzle/db";
import { eq,gt,like } from "drizzle-orm";
import {
    stateCityRelation,cityRestaurantRelation,cityAddressRelation,restaurantMenuItemRelation,restaurantOrdersRelation,restaurantOwnerRelation,
    menuItemOrderMenuItemRelation,categoryMenuItemRelation,addressOrdersRelation,usersAddressRelation,usersRestaurantOwnerRelation,usersDriverRelation,usersOrdersRelation,
    usersCommentsRelation,
    driverOrdersRelation,
    ordersCommentsRelation,
    ordersOrderStatusRelation,
    ordersOrderMenuItemRelation,
    statusCatalogOrderStatusRelation
} from "./drizzle/schema";

import {
    tableState,
    tableCity,
    tableRestaurant,
    tableCategory,
    tableMenuItem,
    tableStatusCatalog,
    tableUsers,
    tableDriver,
    tableRestaurantOwner,
    tableAddress,
    tableOrders,
    tableOrderStatus,
    tableComment,
    tableOrderMenuItem
} from "./drizzle/schema";


const getUsersWithPostsAndProfiles = async () => {
}




async function main() {
    // console.log(await updateUserProfile("I am a senior developer", 1))
    // await deleteUserProfile(3)
    // console.log(await getProfiles());
    // await createUser({ address: "Lagos", fullname: "John Doe", phone: "08012345678", score: 100 })
    // console.log(await getUsers())
    // console.log((await createUserProfile({ userId: 1, bio: "I am a developer" })))
    // console.log(await getUsersWithPostsAndProfiles())
    // console.log( await insertData())
    // console.log( await getUserWithProfile())
}
main();