import RestaurantsDAO from "../dao/restaurantsDOA";

export default class RestaurantsController {
    static async apiGetRestaurnats(req, res, next) {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
// converting page no. to int to check for results ? is for if else statment
        let filters = {}
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        const { restaurantsList, totalNumRestaurnats } = await RestaurantsDAO.getRestaurants({
            filters,
            page, 
            restaurantsPerPage
        })
        
        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurnats,
        }
        res.json(response)
    }
}