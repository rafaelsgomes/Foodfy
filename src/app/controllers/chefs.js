const Chef = require('../models/Chef')
const File = require('../models/File')

module.exports = {
    async chefsList(req, res){
        let {limit, page} = req.query, offset
        limit = limit || 8
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset}
        
        let results = await Chef.all(params)
        const chefs = results.rows

        if(!chefs) return res.send('Product Not Found!')

        const pagination = {total: Math.ceil(chefs[0].total / limit), page} 
        
        return res.render('user/chefs/chefs', {chefs, pagination})
    },
    async details(req, res){
        const {id} = req.params
        let results = await Chef.show(id)
        const chef = results.rows[0]

        results = await Chef.showRecipes(id)
        const recipes = results.rows

        results = await File.find(chef.file_id)
        let avatar = results.rows.map(avatar => ({
            ...avatar,
            src: `${req.protocol}://${req.headers.host}${avatar.path.replace("public", "")}`
        }))

        return res.render('user/chefs/chef-details', {chef, recipes, avatar})

    },
}