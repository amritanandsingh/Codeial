const User = require('../models/User');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signUp = function(req , res){
    return res.render('user_sign_up',{
        title:"codial | Sign Up"
    });
} 

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title : "codial | sign In"
    });
}

//get sign up and get data
module.exports.create = function(req,res){
    console.log("creat method",req.body);
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err , user){
        if(err){console.log("error in finding user in sign up ",err) ; return}
        console.log('testing ',user , err);
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err){console.log("error in creating user in sign up ",err) ; return}
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}
// sign in and creat a session for the user
module.exports.createSession = function(req, res)
{
    // do late

}
