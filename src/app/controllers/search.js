const Search = require('../models/Search')
const { search } = require('../../routes')

module.exports = {
    searchRecipe(req, res){
        let { search, limit, page } = req.query, offset
        if(search){
            limit = limit || 6
            page = page || 1
            offset = limit * (page - 1)
            const params = {limit, page, offset, search}
            Search.recipeFilter(params, (recipes)=>{
                const pagination = {total: Math.ceil(recipes[0].total / limit), page} 
                return res.render('user/recipes/search', {recipes, search, pagination})
            })
        }else{
            return res.redirect('/recipes')
        } 
    },
    searchChef(req, res){
        let { search, limit, page } = req.query, offset
        if(search){
            limit = limit || 8
            page = page || 1
            offset = limit * (page - 1)
            const params = {limit, page, offset, search}
            Search.chefFilter(params, (chefs)=>{
                const pagination = {total: Math.ceil(chefs[0].total / limit), page} 
                return res.render('user/chefs/search', {chefs, search, pagination})
            })
        }else{
            return res.redirect('/chefs')
        }
    }
}