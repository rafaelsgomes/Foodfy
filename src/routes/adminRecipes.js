const express = require('express')
const routes = express.Router()

// MIDDLEWARES
const multer =  require('../app/middlewares/multer')

// CONTROLLERS
const AdminRecipesController = require('../app/controllers/AdminRecipesController')

// ADMIN RECIPES
routes.get('/', AdminRecipesController.recipesList)
routes.get('/create', AdminRecipesController.create)
routes.get('/:id', AdminRecipesController.details)
routes.get('/:id/edit', AdminRecipesController.edit)
routes.post('/', multer.array("images", 5), AdminRecipesController.post)
routes.put('/', multer.array("images", 5), AdminRecipesController.put)
routes.delete('/', AdminRecipesController.delete)

module.exports = routes