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
            return res.render('admin/chefs/chefs', {chefs, pagination})
        })   
    },
    details(req, res){
        const {id} = req.params  
        Chef.show(id, (chef)=>{
            Chef.showRecipes(id, (recipes)=>{
                return res.render('admin/chefs/chef-details', {chef, recipes})
            })
        })
    },
    create(req, res){
        return res.render('admin/chefs/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key] == '') return res.send('Por favor preencha todos os campos!')
        }
        Chef.create(req.body, (chef)=>{
            return res.redirect(`/admin/chef/${chef.id}`)
        })
        
    },
    edit(req, res){
        const {id} = req.params  
        Chef.show(id, (chef)=>{
            return res.render('admin/chefs/edit', {chef})
        })
    },
    put(req, res){
        Chef.update(req.body, ()=>{
            return res.redirect(`/admin/chef/${req.body.id}`)
        })
        
        
    },
    delete(req, res){
        Chef.delete(req.body.id, ()=>{
            return res.redirect(`/admin/chefs`)
        })
    }
}