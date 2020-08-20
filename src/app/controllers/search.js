const Search = require('../models/Search')
const { search } = require('../../routes')

module.exports = {
    searchRecipe(req, res){
        const { search } = req.query
        if(search){
            Search.recipeFilter(search, (recipes)=>{
                return res.render('user/recipes/search', {recipes, search})
            })
        }else{
            return res.redirect('/recipes')
        }
        
    },
    searchChef(req, res){
        const { search } = req.query
        if(search){
            Search.chefFilter(search, (chefs)=>{
                return res.render('user/chefs/search', {chefs, search})
            })
        }else{
            return res.redirect('/chefs')
        }
        
    }
}