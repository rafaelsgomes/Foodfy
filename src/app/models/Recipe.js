const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports = {
    all(params){ 
        return db.query(`SELECT recipes.*, (SELECT count(*) FROM recipes) AS total, chefs.name AS chef_name FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ORDER BY updated_at DESC
        LIMIT $1 OFFSET $2`, [params.limit, params.offset])
        
    },
    create(data){
        const query = `INSERT INTO recipes (
            title,
            ingredients,
            preparation,
            information,
            chef_id,
            created_at,
            updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`
        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef,
            date(Date.now()).iso,
            date(Date.now()).iso
        ]
        return db.query(query, values)
    },
    show(id){
        return db.query(`SELECT recipes.*, chefs.name AS chef_name FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id])
    },
    chefsOptions(){
        return db.query(`SELECT name, id FROM chefs`)
    },
    update(data){
        const query = `UPDATE recipes SET
            title=($1),
            ingredients=($2),
            preparation=($3),
            information=($4),
            chef_id=($5)
        WHERE id = $6 `
        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef,
            data.id
        ]
        return db.query(query, values)
    },
    delete(id){
        return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
    },
    files(id){
        return db.query(`SELECT files.* FROM files LEFT JOIN recipe_files ON (files.id = recipe_files.file_id) 
        LEFT JOIN recipes ON (recipes.id = recipe_files.recipe_id)
        WHERE recipes.id = $1`, [id])
    }
}