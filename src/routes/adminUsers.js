const express = require('express')
const routes = express.Router()

// CONTROLLERS
const UserController = require('../app/controllers/UserController')

// ROUTES TO MANAGE USERS
routes.get('/', UserController.usersList)
routes.get('/create', UserController.createForm)
routes.post('/', UserController.post)
routes.get('/:id/edit', UserController.editForm)
routes.put('/', UserController.put)
routes.delete('/', UserController.delete)

module.exports = routes