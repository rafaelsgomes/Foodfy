const express = require('express')
const routes = express.Router()

// CONTROLLERS
const recipes = require('../app/controllers/RecipesController')
const chefs = require('../app/controllers/ChefsController')
const search = require('../app/controllers/SearchController')

// ROUTES
const adminRecipes = require('./adminRecipes')
const adminChefs = require('./adminChefs')
const profile = require('./adminProfiles')
const users = require('./adminUsers')

routes.get('/', (req, res)=>{
    return res.redirect('index')
})

////////// HOME
    //RECIPES
routes.get('/index', recipes.index)
routes.get('/about', recipes.about)
routes.get('/recipes', recipes.recipesList)
routes.get('/recipe/:id', recipes.details)

    //CHEFS
routes.get('/chefs', chefs.chefsList)
routes.get('/chef/:id', chefs.details)

    //SEARCH
routes.get('/recipes/results', search.searchRecipe)
routes.get('/chefs/results', search.searchChef)

////////// ADMIN
    // RECIPES
routes.use('/admin/recipes', adminRecipes)

    // CHEFS
routes.use('/admin/chefs', adminChefs)

    // PROFILE
routes.use('/admin/profile', profile)
    // USERS
routes.use('/admin/users', users)

////////// ALIAS
routes.get('/admin', (req, res)=>{
    return res.redirect('/admin/profile/login')
})

module.exports = routes