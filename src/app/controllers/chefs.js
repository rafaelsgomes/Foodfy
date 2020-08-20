const Chef = require('../models/Chef')

module.exports = {
    chefsList(req, res){
        Chef.all((chefs)=>{
            return res.render('user/chefs/chefs', {chefs})
        })  
    },
    details(req, res){
        const {id} = req.params  
        Chef.show(id, (chef)=>{
            Chef.showRecipes(id, (recipes)=>{
                return res.render('user/chefs/chef-details', {chef, recipes})
            })
        })
    },
}