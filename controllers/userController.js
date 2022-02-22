const { User } = require('../models');

module.exports.renderRegistration = function(req,res){
    res.render('users/register');
}

module.exports.register = async function(req,res){
    const existingUser = await User.findOne({
        where: {
            email:req.body.email
        }
    });
    if (existingUser){
        res.render('user/register', {
            error: 'User Already Exists'
        })
    } else {
        await User.create({
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        })
        res.redirect('/');
    }
}