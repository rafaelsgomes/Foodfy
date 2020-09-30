module.exports = {
    usersList(req, res){
        return res.render('admin/users/users-list')
    },
    createForm(req, res){
        return res.render('admin/users/create')
    },
    post(req, res){
        return res.send('ok')
    },
    editForm(req, res){
        return res.render('admin/users/edit')
    },
    put(req, res){
        return res.send('ok')
    },
    delete(req, res){
        return res.send('ok')
    }
}