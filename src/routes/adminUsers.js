const express = require('express')
const routes = express.Router()

// CONTROLLERS
const UserController = require('../app/controllers/UserController')

// ROUTES TO MANAGE USERS
// routes.get('/', UserController.usersList)
// routes.post('/', UserController.post)
// routes.put('/', UserController.put)
// routes.delete('/', UserController.delete)

module.exports = routes