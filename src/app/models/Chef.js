const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports = {
    all(callback){
        db.query(`SELECT chefs.*, count(recipes) AS recipes_total FROM chefs 
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id`, (err, results)=>{
            if(err) throw `Database error ${err}`

            callback(results.rows)
        })
    },
    show(id, callback){
        db.query(`SELECT chefs.*, count(recipes) AS recipes_total FROM chefs 
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id], (err, results)=>{
            if(err) throw `Database error ${err}`
            
            callback(results.rows[0])
        })
    },
    showRecipes(id, callback){
        db.query(`SELECT recipes.* FROM recipes WHERE recipes.chef_id = $1`, [id], (err, results)=>{
            if(err) throw `Database error ${err}`
            
            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `INSERT INTO chefs (
            name,
            avatar_url,
            created_at
        ) VALUES ($1, $2, $3) RETURNING ID `
        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso 
        ]
        db.query(query, values, (err, results)=>{
            if(err) throw `Database error ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `UPDATE chefs SET 
        name=($1),
        avatar_url=($2)
        WHERE id = $3
        `
        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]
        db.query(query, values, (err, results)=>{
            if(err) throw `Database error ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], (err, results)=>{
            if(err) throw `Database error ${err}`
    
            callback()
        })
    },
    
}