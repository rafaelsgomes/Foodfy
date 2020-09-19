const express = require('express')
const routes = express.Router()

// MIDDLEWARES
const multer =  require('../app/middlewares/multer')

// CONTROLLERS
const adminRecipes = require('../app/controllers/AdminRecipesController')

// ADMIN RECIPES
routes.get('/', adminRecipes.recipesList)
routes.get('/create', adminRecipes.create)
routes.get('/:id', adminRecipes.details)
routes.get('/:id/edit', adminRecipes.edit)
routes.post('/', multer.array("images", 5), adminRecipes.post)
routes.put('/', multer.array("images", 5), adminRecipes.put)
routes.delete('/', adminRecipes.delete)

module.exports = routes