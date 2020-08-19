const db = require('../../config/db')

module.exports = {
    all(callback){
        db.query(`SELECT * FROM recipes`, (err, results)=>{
            if(err) throw `Database error ${err}`

            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `INSERT INTO recipes (
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at,
            chef_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ID `
        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            Date.now()
        ]
        db.query(query, values, (err, results)=>{
            if(err) throw `Database error ${err}`

            callback(results.rows[0])
        })
    }
}