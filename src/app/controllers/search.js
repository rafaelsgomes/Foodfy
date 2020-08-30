const Search = require('../models/Search')

module.exports = {
    async searchRecipe(req, res){
        let { search, limit, page } = req.query, offset
        if(search){
            limit = limit || 6
            page = page || 1
            offset = limit * (page - 1)
            const params = {limit, page, offset, search}

            const results =await Search.recipeFilter(params)
            const recipes = results.rows

            const pagination = {total: Math.ceil(recipes[0].total / limit), page} 
            return res.render('user/recipes/search', {recipes, search, pagination})
        }else{
            return res.redirect('/recipes')
        }
    },
    async searchChef(req, res){
        let { search, limit, page } = req.query, offset
        if(search){
            limit = limit || 8
            page = page || 1
            offset = limit * (page - 1)
            const params = {limit, page, offset, search}

            const results = await Search.chefFilter(params)
            const chefs = results.rows
            const pagination = {total: Math.ceil(chefs[0].total / limit), page} 
            return res.render('user/chefs/search', {chefs, search, pagination})
        }else{
            return res.redirect('/chefs')
        }
    }
}