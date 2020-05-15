const express = require('express');
const router  = express.Router();
const passport = require('passport');

// Password Encryption
const bcrypt = require('bcryptjs')

// User Model
const User = require('../models/User')

// Login Route Page
router.get('/login', (req, res) => res.render("login"));

// Register Route Page
router.get('/Register', (req, res) => res.render("register"));

router.post('/register', (req, res) => {
    // console.log(req.body)
    const { name, email, password, password2  } = req.body

    let errors = [];
    // Verify required fields
    if(!name || !email || !password || !password2){
        errors.push({ message: "Please fill in all fields!"  })
    }
    // Check passwords Match
    if(password !== password2){
        errors.push({ message: "Passwords do not match!"  })
    }
    // Check length of passwords
    if(password.length < 6){
        errors.push({ message: "Password is too short!"  })
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        // res.send('Pass')
        User.findOne({ email: email })
        .then(user => {
            if(user){
                // User already exists
                errors.push({ message: "Email is already in use!" });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // console.log(newUser)
                // res.send('Pass!')
                
                // Encrypt Passwords
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hashPassword) => {
                        if(error){
                            throw error;
                        }
                        // Set password to new hashed password
                        newUser.password = hashPassword; 
                        newUser.save()
                            .then( (user) => {
                                req.flash('success_message', "Successfully Registered!");
                                res.redirect('/users/login')
                            })
                            .catch( (error) => console.log(error) );
                    })
                })
            }
        });
    }

});

//Login Logic
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { 
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Handle Logouts
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_message', "You have logged out successfully!");
    res.redirect("/users/login");
});

module.exports = router;