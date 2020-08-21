const Chef = require('../models/Chef')

module.exports = {
    chefsList(req, res){
        let {limit, page} = req.query, offset
        limit = limit || 8
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset}
        Chef.all(params, (chefs)=>{
            const pagination = {total: Math.ceil(chefs[0].total / limit), page}
            return res.render('user/chefs/chefs', {chefs, pagination})
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