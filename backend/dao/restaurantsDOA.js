let restaurants
export default class RestaurantsDAO{
    static async injectDB(conn) {
        if(restaurants){
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS)
        }
    }
}