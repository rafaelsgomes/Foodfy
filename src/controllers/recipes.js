const data = require('../data/data.json')

// pág inicial
exports.index = (req, res)=>{
    return res.render('index', {recipes: data.recipes})
}

// pág sobre
exports.about = (req, res)=>{
    return res.render('about')
}

//listagem
exports.recipeslist = (req, res)=>{
    return res.render('user/recipe', {recipes: data.recipes})
}

//details
exports.details = (req, res)=>{
    const recipeId = req.params.id
    const recipe = data.recipes[recipeId]

    return res.render('user/recipe-details', {recipe})
}