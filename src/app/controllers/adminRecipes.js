const Recipe = require('../models/Recipe')

module.exports = {
    recipesList(req, res){
        Recipe.all((recipes)=>{
            return res.render('admin/recipe', {recipes})
        }) 
    },
    details(req, res){
        const {id} = req.params  
        const recipe = {
            ...data.recipes[id],
            id
        }
        if(recipe.id > data.recipes.length || recipe.id < 0) return res.send('Recipe not found!')

        return res.render('admin/recipe-details', {recipe})
    },
    create(req, res){
        return res.render('admin/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key] == '') return res.send('Por favor preencha todos os campos!')
        }
        Recipe.create(req.body, (recipe)=>{
            return res.redirect(`/admin/recipe/${recipe.id}`)
        }) 
    },
    edit(req, res){
        const {id} = req.params  
        const recipe = {
            ...data.recipes[id],
            id
        }
        if(recipe.id > data.recipes.length || recipe.id < 0) return res.send('Recipe not found!')
    
        return res.render('admin/edit', {recipe})
    },
    put(req, res){
        const {id} = req.body

        let {image, title, author, ingredients, preparation, information} = req.body
        const recipe = {
            image, 
            title, 
            author, 
            ingredients, 
            preparation, 
            information
        }
        console.log(recipe)
    
        data.recipes[id] = recipe
    
        fs.writeFile('./src/data/data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) return res.send('Erro ao cadastrar receita')
    
            return res.redirect(`/admin/recipes/${id}`)
        })  
    },
    delete(req, res){
        const {id} = req.body
        const recipeDelete = data.recipes[id]
        const filteredRecipes = data.recipes.filter((recipe)=>{
            return recipe != recipeDelete    
        })
        data.recipes = filteredRecipes
    
        fs.writeFile('./src/data/data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) return res.send('Erro')
    
            return res.redirect(`/admin/recipes`)
        })  
    }
}