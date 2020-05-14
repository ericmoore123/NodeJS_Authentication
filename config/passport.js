const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user "Model"
const User = require('../models/User');


module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            // Check for existing users in database
            User.findOne({ email: email })
                .then(user => {
                    if(!user){ 
                        return done(null, false, { message: "Email is not yet registered!" });
                    }

                    // Check for password
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if(error){
                            throw error;
                        }

                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false, { message: 'Password Incorrect' });
                        }
                    });
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });
};
