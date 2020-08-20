const Recipe = require('../models/Recipe')

module.exports = {
    // Initial page
    index(req, res){
        Recipe.all((recipes)=>{
            Recipe.showChefsName(()=>{
                return res.render('user/index', {recipes})
            })
            
        })  
    },
    // About page
    about(req, res){
        return res.render('user/about')
    },
    // List of all recipes
    recipesList(req, res){
        Recipe.all((recipes)=>{
            Recipe.showChefsName(()=>{
                return res.render('user/recipes/recipes', {recipes})
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