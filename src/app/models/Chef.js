const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports = {
    all(params){
        return db.query(`SELECT chefs.*, (SELECT count(*) FROM chefs) AS total, count(recipes) AS recipes_total FROM chefs 
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id
        LIMIT $1 OFFSET $2`, [params.limit, params.offset])
    },
    show(id){
        return db.query(`SELECT chefs.*, count(recipes) AS recipes_total FROM chefs 
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id])
    },
    showRecipes(id){
        return db.query(`SELECT recipes.* FROM recipes WHERE recipes.chef_id = $1`, [id])
    },
    create(data, fileId){
        const query = `INSERT INTO chefs (
            name,
            created_at,
            updated_at,
            file_id
        ) VALUES ($1, $2, $3, $4) RETURNING ID `
        const values = [
            data.name,
            date(Date.now()).iso,
            date(Date.now()).iso,
            fileId
        ]
        return db.query(query, values)
    },
    update(data, fileId){
        const query = `UPDATE chefs SET 
        name=($1),
        file_id=($2)
        WHERE id = $3
        `
        const values = [
            data.name,
            fileId,
            data.id
        ]
        return db.query(query, values)
    },
    delete(id){
        return db.query(`DELETE FROM chefs WHERE id = $1`, [id])
    },
    
}