const passport =  require('passport');
const LocalStragegy =  require('passport-local').Strategy;
const User = require('../models/user');
// authentication using passport
passport.use( new LocalStragegy({
    usernameField : 'email' ,
    //passReqToCallback : true 
},
    function(email , password , done){
        // find user and estabilish identity
        console.log(email);
        console.log(password);
        User.findOne({email : email },function(err , user){
           console.log(user);
            if(err)
            {
                console.log("error in finding user and password");
                return done(err);
            }
            if(!user || user.password != password)
            {
                console.log("invalid user/password");
                return done(null , false);
            }
            return done(null , user);
        });
    }
));

// serialiszed user to keep key in cookies
passport.serializeUser(function(user , done){
    done(null ,user.id );
});

//deseriliszed key from cookies
passport.deserializeUser(function(id,done){
    User.findById(id , function(err ,user){
        if(err)
            {
                console.log("error in finding user and password");
                return done(err);
            }
        return done(null,user);  
    } )
});

// cheack if user is authenticate
passport.checkAuthentication = function(req , res , next){
    // if if user is sign in then pass the request to next function(controler action).
    if(req.isAuthenticated())
    {
        return next();
    }
    // if user is not sign in 
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req , res , next)
{
    // req.user contain the current sign in user from the session cookie and we are just sending this to the locals for the views.

    if(req.isAuthenticated())
    {
        res.locals.user = req.user ; 
    }
    next();
}
module.exports = passport;