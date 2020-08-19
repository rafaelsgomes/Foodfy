module.exports = {
    chefsList(req, res){
        return res.render('admin/chefs/chefs', {chefs})
    },
    details(req, res){
        const {id} = req.params  
        const chef = {
            ...data.chefs[id],
            id
        }
        if(chef.id > data.chefs.length || chef.id < 0) return res.send('Chef not found!')

        return res.render('admin/chefs/chef-details', {chef})
    },
    create(req, res){
        return res.render('admin/chefs/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key] == '') return res.send('Por favor preencha todos os campos!')
        }
    
        data.chefs.push({ ...req.body })
    
        fs.writeFile('./src/data/data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) return res.send('Erro ao cadastrar receita')
    
            return res.redirect('/admin/chefs')
        }) 
    },
    edit(req, res){
        const {id} = req.params  
        const chef = {
            ...data.chefs[id],
            id
        }
        if(chef.id > data.chefs.length || chef.id < 0) return res.send('Chef not found!')
    
        return res.render('admin/chefs/edit', {chef})
    },
    put(req, res){
        const {id} = req.body

        let {image, title, author, ingredients, preparation, information} = req.body
        const chef = {
            image, 
            title, 
            author, 
            ingredients, 
            preparation, 
            information
        }
        console.log(chef)
    
        data.chefs[id] = chef
    
        fs.writeFile('./src/data/data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) return res.send('Erro ao cadastrar receita')
    
            return res.redirect(`/admin/chefs/${id}`)
        })  
    },
    delete(req, res){
        const {id} = req.body
        const chefDelete = data.chefs[id]
        const filteredChefs = data.chefs.filter((chef)=>{
            return chef != chefDelete    
        })
        data.chefs = filteredChefs
    
        fs.writeFile('./src/data/data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) return res.send('Erro')
    
            return res.redirect(`/admin/chefs`)
        })  
    }
}