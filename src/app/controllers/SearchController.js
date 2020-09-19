const Search = require('../models/Search')
const Recipe = require('../models/Recipe')
const File = require('../models/File')

module.exports = {
    async searchRecipe(req, res){
        let { search, limit, page } = req.query, offset
        if(search){
            limit = limit || 6
            page = page || 1
            offset = limit * (page - 1)
            const params = {limit, page, offset, search}

            const results = await Search.recipeFilter(params)
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
            return res.render('home/recipes/search', {recipes: lastAdded, search, pagination})
        }else{
            return res.redirect('/recipes')
        }
    },
    async searchChef(req, res){
        let { search, limit, page } = req.query, offset
        if(search){
            limit = limit || 8
            page = page || 1
            offset = limit * (page - 1)
            const params = {limit, page, offset, search}

            const results = await Search.chefFilter(params)
            const chefs = results.rows

            if(!chefs) return res.send('Chef Not Found!')

            async function getImage(fileId){
                let results = await File.find(fileId)
                const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
                return images[0]
            }
    
            const imagesPromise = chefs.map( async chef => {
                chef.avatar = await getImage(chef.file_id)
                return chef
            })
            
            const lastAdded = await Promise.all(imagesPromise)

            const pagination = {total: Math.ceil(chefs[0].total / limit), page} 
            return res.render('home/chefs/search', {chefs: lastAdded, search, pagination})
        }else{
            return res.redirect('/chefs')
        }
    }
}