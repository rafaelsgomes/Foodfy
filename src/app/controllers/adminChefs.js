const Chef = require('../models/Chef')
const File = require('../models/File')

module.exports = {
    async chefsList(req, res){
        let {limit, page} = req.query, offset
        limit = limit || 8
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset}

        let results = await Chef.all(params)
        let chefs = results.rows

        if(!chefs) return res.send('Product Not Found!')

        const pagination = {total: Math.ceil(chefs[0].total / limit), page} 
        
        return res.render('admin/chefs/chefs', {chefs, pagination})
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

        return res.render('admin/chefs/chef-details', {chef, recipes, avatar})

    },
    create(req, res){
        return res.render('admin/chefs/create')
    },
    async post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key] == '') return res.send('Por favor preencha todos os campos!')
        }

        if(req.files.lenght > 1) return false

        const imagesPromise = req.files.map(file => File.create({...file}))
        let results = await imagesPromise[0]

        const imageId = results.rows[0].id
        results = await Chef.create(req.body, imageId)
        const chef = results.rows[0]

        return res.redirect(`/admin/chef/${chef.id}`)
        
    },
    async edit(req, res){
        const {id} = req.params  
        let results = await Chef.show(id)
        const chef = results.rows[0]

        results = await File.find(chef.file_id)
        let avatar = results.rows.map(avatar => ({
            ...avatar,
            src: `${req.protocol}://${req.headers.host}${avatar.path.replace("public", "")}`
        }))

        return res.render('admin/chefs/edit', {chef, avatar})
    },
    async put(req, res){
        const imagesPromise = req.files.map(file => File.create({...file}))
        let results = await imagesPromise[0]

        const imageId = results.rows[0].id
        await Chef.update(req.body, imageId)
        return res.redirect(`/admin/chef/${req.body.id}`)
    },
    async delete(req, res){
        await Chef.delete(req.body.id)
        return res.redirect(`/admin/chefs`)
    }
}