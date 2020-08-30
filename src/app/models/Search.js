const db = require('../../config/db')

module.exports = {
    recipeFilter(params){
        let searchQuery = ``,
            totalQuery = `(SELECT count(*) FROM recipes) AS total`

        if(params.search){
            searchQuery = `WHERE recipes.title ILIKE '%${params.search}%'` 
            totalQuery = `(SELECT count(*) FROM recipes ${searchQuery}) AS total`
        }

        let query = `SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ${searchQuery}
        LIMIT $1 OFFSET $2`
        return db.query(query, [params.limit, params.offset])
    },
    chefFilter(params, callback){
        let searchQuery = ``,
        totalQuery = `(SELECT count(*) FROM chefs) AS total`

        if(params.search){
        searchQuery = `WHERE chefs.name ILIKE '%${params.search}%'` 
        totalQuery = `(SELECT count(*) FROM chefs ${searchQuery}) AS total`
        }

        let query = `SELECT chefs.*, ${totalQuery}, count(recipes) AS recipes_total FROM chefs 
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        ${searchQuery}
        GROUP BY chefs.id
        LIMIT $1 OFFSET $2`

        return db.query(query, [params.limit, params.offset])
    },
}