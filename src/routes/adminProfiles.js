const express = require('express')
const routes = express.Router()

// CONTROLLERS
const ProfileController = require('../app/controllers/ProfileController')

// LOGIN
routes.get('/login', ProfileController.loginForm)
routes.post('/login', ProfileController.login)

// LOGOUT
routes.post('/logout', ProfileController.logout)

// PASSWORD RESET/ FORGOT
routes.get('/forgot-password', ProfileController.forgotForm)
routes.post('/forgot-password', ProfileController.forgotPassword)
routes.get('/reset', ProfileController.resetForm)
routes.post('/reset', ProfileController.resetPassword)

// LOGGED PROFILE ROUTES
routes.get('/', ProfileController.index)
routes.put('/', ProfileController.put)

module.exports = routes