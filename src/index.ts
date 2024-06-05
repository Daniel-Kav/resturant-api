import db from "./drizzle/db";
import { eq,gt,like } from "drizzle-orm";
import {category, city, menuItem, order, restaurant, user} from "./drizzle/schema";
import { equal } from "assert";



const getCitieswithStates = async () => {
    return await db.query.city.findMany({
        columns: {
            stateId:true,
            name: true
        },
        with: {
            state:{
                columns: {
                    name: true
                }
            }
        }
    })
}

const getRestuarantById = async (restaurantId: number) => {
    return db.query.restaurant.findFirst({
        where: eq(restaurant.id, restaurantId),
      with: {
        menuItems: {
          with: {
            category:{
                columns:{
                    name: true,
                }
            }
          },
        },
      },
    })
}




async function main() {
    console.log(await getCitieswithStates() )
    console.log(await getRestuarantById(5))
}
main();