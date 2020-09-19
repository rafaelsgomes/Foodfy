const Recipe = require('../models/Recipe')
const File = require('../models/File')

module.exports = {
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
        
        return res.render('admin/recipes/recipe', {recipes: lastAdded, pagination})
    },
    async details(req, res){
        const {id} = req.params  
        let results = await Recipe.show(id)
        const recipe = results.rows[0]

        results = await Recipe.files(recipe.id)
        let images = results.rows.map(image => ({
            ...image,
            src: `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}`
        }))

        return res.render('admin/recipes/recipe-details', {recipe, images}) 
    },
    async create(req, res){
        let results = await Recipe.chefsOptions()
        const chefs = results.rows
        return res.render('admin/recipes/create', {chefs})
    },
    async post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key] == '') return res.send('Por favor preencha todos os campos!')
        }
        if(req.files.length == 0) return res.send("Por favor envie pelo menos uma imagem")

        let results = await Recipe.create(req.body)
        const recipe = results.rows[0].id

        const imagesPromise = req.files.map(file => File.createRecipeFiles({...file, recipe_id: recipe}))
        await Promise.all(imagesPromise)


        return res.redirect(`/admin/recipes/${recipe}`)
    },
    async edit(req, res){
        const {id} = req.params  

        let results = await Recipe.show(id)
        const recipe = results.rows[0]

        results = await Recipe.chefsOptions()
        const chefs = results.rows

        results = await Recipe.files(recipe.id)
        let images = results.rows

        images = images.map(image => ({
            ...image,
            src: `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}`
        }))
        return res.render('admin/recipes/edit', {recipe, chefs, images})
        
    },
    async put(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key] == '' && key != "removed_images") return res.send('Por favor preencha todos os campos!')
        }

        if(req.files.length != 0){
            const newImagesPromise = req.files.map(file => File.createRecipeFiles({...file, recipe_id: req.body.id}))
            await Promise.all(newImagesPromise)
        }
        if(req.body.removed_images){
            const removedImages =  req.body.removed_images.split(",")
            const lastIndex = removedImages.length - 1
            removedImages.splice(lastIndex, 1)

            const removedPromise = removedImages.map(id => File.deleteFile(id))
            await Promise.all(removedPromise)
        }

        await Recipe.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`) 
    },
    async delete(req, res){
        await Recipe.delete(req.body.id)

        return res.redirect('/admin/recipes')
    }
}