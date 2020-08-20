
module.exports = {
    searchRecipe(req, res){
        return res.render('user/recipes/search')
    },
    searchChef(req, res){
        return res.render('user/chefs/search')
    }
}