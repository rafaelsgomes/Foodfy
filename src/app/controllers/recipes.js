const Recipe = require('../models/Recipe')

module.exports = {
    // Initial page
    index(req, res){
        let {limit, page} = req.query, offset
        limit = limit || 6
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset}
        Recipe.all(params, (recipes)=>{
            Recipe.showChefsName(()=>{
                const pagination = {total: Math.ceil(recipes[0].total / limit), page}
                return res.render('user/index', {recipes, pagination})
            })  
        })  
    },
    // About page
    about(req, res){
        return res.render('user/about')
    },
    // List of all recipes
    recipesList(req, res){
        let {limit, page} = req.query, offset
        limit = limit || 6
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset}
        Recipe.all(params, (recipes)=>{
            Recipe.showChefsName(()=>{
                const pagination = {total: Math.ceil(recipes[0].total / limit), page} 
                return res.render('user/recipes/recipes', {recipes, pagination})
            })  
        })
    },
    details(req, res){
        const {id} = req.params  
        Recipe.show(id, (recipe)=>{
            Recipe.showChefsName(()=>{
                return res.render('user/recipes/recipe-details', {recipe})
            })
        })
    },
}