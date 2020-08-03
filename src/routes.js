const express = require('express')
const routes = express.Router()
const recipes = require('./controllers/recipes')
const admin = require('./controllers/admin')

routes.get('/', (req, res)=>{
    return res.redirect('index')
})

//user
routes.get('/index', recipes.index)
routes.get('/about', recipes.about)
routes.get('/recipe', recipes.recipeslist)
routes.get('/recipe/:id', recipes.details)

//admin
routes.get('/admin/recipes', admin.recipeslist)
routes.get('/admin/recipes/create', admin.create)
routes.get('/admin/recipes/:id', admin.details)
routes.get('/admin/recipes/:id/edit', admin.edit)

routes.post('/admin/recipes', admin.post)
routes.put('/admin/recipes', admin.put)
routes.delete('/admin/recipes', admin.delete)


module.exports = routes