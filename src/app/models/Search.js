const db = require('../../config/db')

module.exports = {
    recipeFilter(search, callback){
        let query = `SELECT recipes.*, chefs.name AS chef_name FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${search}%'`

        db.query(query, (err, results)=>{
            if(err) throw `Database error ${err}`
            callback(results.rows)
        })
    },
    chefFilter(search, callback){
        let query = `SELECT chefs.*, count(recipes) AS recipes_total FROM chefs 
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        WHERE chefs.name ILIKE '%${search}%'
        GROUP BY chefs.id`

        db.query(query, (err, results)=>{
            if(err) throw `Database error ${err}`
            callback(results.rows)
        })
    },
}