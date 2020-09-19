const express = require('express')
const routes = express.Router()

// MIDDLEWARES
const multer =  require('../app/middlewares/multer')

// CONTROLLERS
const adminChefs = require('../app/controllers/AdminChefsController')

// ADMIN CHEFS
routes.get('/', adminChefs.chefsList)
routes.get('/create', adminChefs.create)
routes.get('/:id', adminChefs.details)
routes.get('/:id/edit', adminChefs.edit)
routes.post('/', multer.array("images", 1), adminChefs.post)
routes.put('/', multer.array("images", 1), adminChefs.put)
routes.delete('/', adminChefs.delete)

module.exports = routes