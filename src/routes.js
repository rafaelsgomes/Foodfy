const express = require('express')
const routes = express.Router()
const multer =  require('./app/middlewares/multer')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')
const search = require('./app/controllers/search')
const adminRecipes = require('./app/controllers/adminRecipes')
const adminChefs = require('./app/controllers/adminChefs')

routes.get('/', (req, res)=>{
    return res.redirect('index')
})

//user recipes
routes.get('/index', recipes.index)
routes.get('/about', recipes.about)
routes.get('/recipes', recipes.recipesList)
routes.get('/recipe/:id', recipes.details)

//user chefs
routes.get('/chefs', chefs.chefsList)
routes.get('/chef/:id', chefs.details)

//Search
routes.get('/recipes/results', search.searchRecipe)
routes.get('/chefs/results', search.searchChef)

//admin recipes
routes.get('/admin/recipes', adminRecipes.recipesList)
routes.get('/admin/recipes/create', adminRecipes.create)
routes.get('/admin/recipe/:id', adminRecipes.details)
routes.get('/admin/recipe/:id/edit', adminRecipes.edit)
routes.post('/admin/recipes', multer.array("images", 5), adminRecipes.post)
routes.put('/admin/recipe', multer.array("images", 5), adminRecipes.put)
routes.delete('/admin/recipe', adminRecipes.delete)

// admin chefs
routes.get('/admin/chefs', adminChefs.chefsList)
routes.get('/admin/chefs/create', adminChefs.create)
routes.get('/admin/chef/:id', adminChefs.details)
routes.get('/admin/chef/:id/edit', adminChefs.edit)
routes.post('/admin/chefs', adminChefs.post)
routes.put('/admin/chef', adminChefs.put)
routes.delete('/admin/chef', adminChefs.delete)

module.exports = routes