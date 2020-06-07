const LocalStrategy = require("passport-local").Strategy,
      User          = require("../models/user"),
      config        = require("../config/database"),
      bcrypt        = require("bcryptjs")



module.exports = (passport) => {
    //Local Strategy
    passport.use(new LocalStrategy((username , password , done) => {
        //Match Username
        let query = {username: username};
        User.findOne(query , (err, user) => {
            if(err) throw err;
            if(!user) {
                return done(null , false , {message: 'no user found'});
            }
            //match password
            bcrypt.compare(password , user.password , (err , isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    return done(null , user)
                } else {
                    return done(null , false , {message: 'Wrong password'});
                }
            });
        });
    }));

    passport.serializeUser((user , done) => {
        done(null , user.id);
    });

    passport.deserializeUser((id , done) => {
        User.findById(id , (err , user) => {
            done(err , user);
        });
    });
}