module.exports = {
    index(req, res){
        return res.send("ok")
    },
    put(req, res){
        return res.send('editado')
    },
    loginForm(req, res){
        return res.render('admin/profile/loginForm')
    },
    login(req, res){
        return res.send('ok')
    },
    logout(req, res){
        return res.send('ok')
    },
    forgotForm(req, res){
        return res.render('admin/profile/forgotForm')
    },
    forgotPassword(req, res){
        return res.send('ok')
    },
    resetForm(req, res){
        return res.render('admin/profile/resetForm')
    },
    resetPassword(req, res){
        return res.send('ok')
    }
}