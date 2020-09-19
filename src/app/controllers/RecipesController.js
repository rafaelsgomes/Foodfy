const Recipe = require('../models/Recipe')
const File = require('../models/File')

module.exports = {
    // Initial page
    async index(req, res){
        let {limit, page} = req.query, offset
        limit = limit || 6
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset}

        let results = await Recipe.all(params)
        const recipes = results.rows

        if(!recipes) return res.send('Product Not Found!')

        async function getImage(recipeId){
            let results = await Recipe.files(recipeId)
            const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
            return images[0]
        }

        const imagesPromise = recipes.map( async recipe => {
            recipe.image = await getImage(recipe.id)
            return recipe
        }).filter((recipe, index)=> index > 5 ? false : true)
        
        const lastAdded = await Promise.all(imagesPromise)

        const pagination = {total: Math.ceil(recipes[0].total / limit), page} 
        
        return res.render('home/index', {recipes: lastAdded, pagination})
    },
    // About page
    about(req, res){
        return res.render('home/about')
    },
    // List of all recipes
    async recipesList(req, res){
        let {limit, page} = req.query, offset
        limit = limit || 6
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset}

        let results = await Recipe.all(params)
        const recipes = results.rows

        if(!recipes) return res.send('Recipe Not Found!')

        async function getImage(recipeId){
            let results = await Recipe.files(recipeId)
            const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
            return images[0]
        }

        const imagesPromise = recipes.map( async recipe => {
            recipe.image = await getImage(recipe.id)
            return recipe
        })
        
        const lastAdded = await Promise.all(imagesPromise)

        const pagination = {total: Math.ceil(recipes[0].total / limit), page} 
        
        return res.render('home/recipes/recipes', {recipes: lastAdded, pagination})
    },
    async details(req, res){
        const {id} = req.params  
        let results = await Recipe.show(id)
        const recipe = results.rows[0]

        results = await Recipe.files(recipe.id)
        images = results.rows.map(image => ({
            ...image,
            src: `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}`
        }))
        return res.render('home/recipes/recipe-details', {recipe, images}) 
    }
}