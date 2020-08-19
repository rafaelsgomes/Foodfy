const Recipe = require('../models/Recipe')

module.exports = {
    // Initial page
    index(req, res){
        Recipe.all((recipes)=>{
            return res.render('user/index', {recipes})
        })  
    },
    // About page
    about(req, res){
        return res.render('user/about')
    },
    // List of all recipes
    recipesList(req, res){
        Recipe.all((recipes)=>{
            return res.render('user/recipes/recipes', {recipes})
        })
        
    },
    // Details of recipes
    details(req, res){
        const recipeId = req.params.id
        const recipe = data.recipes[recipeId]

        return res.render('user/recipes/recipe-details', {recipe})
    },
}