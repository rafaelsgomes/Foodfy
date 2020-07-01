const express = require('express')
const nunjucks = require('nunjucks')
const data = require('./data/data')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('src/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', (req, res)=>{
    return res.render('index', {recipes: data})
})

server.get('/about', (req, res)=>{
    return res.render('about')
})

server.get('/recipe', (req, res)=>{
    return res.render('recipe', {recipes: data})
})

server.get('/recipe/:index', (req, res)=>{
    const recipeIndex = req.params.index
    const recipe = data[recipeIndex]

    return res.render('recipe-details', {recipe})
})

server.listen(3000, ()=>{
    console.log('server is runing')
})