const express = require('express')
const routes = express.Router()

// MIDDLEWARES
const multer =  require('../app/middlewares/multer')

// CONTROLLERS
const AdminChefsController = require('../app/controllers/AdminChefsController')

// ADMIN CHEFS
routes.get('/', AdminChefsController.chefsList)
routes.get('/create', AdminChefsController.create)
routes.get('/:id', AdminChefsController.details)
routes.get('/:id/edit', AdminChefsController.edit)
routes.post('/', multer.array("images", 1), AdminChefsController.post)
routes.put('/', multer.array("images", 1), AdminChefsController.put)
routes.delete('/', AdminChefsController.delete)

module.exports = routes