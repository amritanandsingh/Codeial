const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User =  require('../models/user');

passport.use(new googleStrategy({
    clientID : "591106666852-k5ehdlvhaeebhar4q7et63opkjuf05is.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
        function(accessToken, refreshToken, profile, done){
            User.findOne({email : profile.emails[0].value}).exec(function(err,user){
                if(err)
                {
                    console.log('error in google strategy-passport ',err);
                    return ;
                }
                console.log(profile);
                if(user)
                {
                    return done(null , user);
                }
                else{
                    User.create({
                        name :  profile.displayName,
                        email : profile.emails[0].value,
                        password : crypto.randomBytes(20).toString('hex')
                    },
                        function(err,user)
                        {
                            if(err)
                            {
                                console.log('error in creating user google strategy-passport ',err);
                                return ;
                            }
                            return done(null , user); 
                        }
                    );
                }  
            });

        }
    ));

module.exports=passport; 