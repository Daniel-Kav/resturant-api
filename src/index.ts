import db from "./drizzle/db";
import { eq,gt,like } from "drizzle-orm";
import {  StateTable,CityTable} from "./drizzle/schema";
import { cityRelations,stateRelations } from "./drizzle/schema";
import { MenuItemTable, RestaurantTable, CategoryTable , OrderDetailsTable} from './drizzle/schema';

const getUsersWithPostsAndProfiles = async () => {
    return await db.query.OrderDetailsTable.findMany({
        with: { order : true
            }
        
    })
}
 


async function main() {
    // console.log(await updateUserProfile("I am a senior developer", 1))
    // await deleteUserProfile(3)
    // console.log(await getProfiles());
    // await createUser({ address: "Lagos", fullname: "John Doe", phone: "08012345678", score: 100 })
    // console.log(await getUsers())
    // console.log((await createUserProfile({ userId: 1, bio: "I am a developer" })))
    console.log(await getUsersWithPostsAndProfiles())
}
main();