const Recipe = require('../models/Recipe')

module.exports = {
    recipesList(req, res){
        let {limit, page} = req.query, offset
        limit = limit || 6
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset}
        Recipe.all(params, (recipes)=>{
            Recipe.showChefsName(()=>{
                const pagination = {total: Math.ceil(recipes[0].total / limit), page} 
                return res.render('admin/recipes/recipe', {recipes, pagination})
            })  
        })
    },
    details(req, res){
        const {id} = req.params  
        Recipe.show(id, (recipe)=>{
            Recipe.showChefsName(()=>{
                return res.render('admin/recipes/recipe-details', {recipe})
            })
        })
    },
    create(req, res){
        Recipe.chefsOptions((options)=>{
            return res.render('admin/recipes/create', {chefs: options})
        })
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
        Recipe.show(id, (recipe)=>{
            Recipe.chefsOptions((options)=>{
                return res.render('admin/recipes/edit', {recipe, chefs: options})
            })
        }) 
    },
    put(req, res){
        Recipe.update(req.body, ()=>{
            return res.redirect(`/admin/recipe/${req.body.id}`)
        })  
    },
    delete(req, res){
        const {id} = req.body
        Recipe.delete(id, ()=>{
            return res.redirect('/admin/recipes')
        })
    }
}