const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')
const File = require('../models/File')

module.exports = {
    async chefsList(req, res){
        let {limit, page} = req.query, offset
        limit = limit || 8
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset}
        
        let results = await Chef.all(params)
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
        
        return res.render('home/chefs/chefs', {chefs: lastAdded, pagination})
    },
    async details(req, res){
        const {id} = req.params
        let results = await Chef.show(id)
        const chef = results.rows[0]

        results = await Chef.showRecipes(id)
        const recipes = results.rows

        results = await File.find(chef.file_id)
        let avatar = results.rows.map(avatar => ({
            ...avatar,
            src: `${req.protocol}://${req.headers.host}${avatar.path.replace("public", "")}`
        }))

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

        return res.render('home/chefs/chef-details', {chef, recipes: lastAdded, avatar})

    },
}