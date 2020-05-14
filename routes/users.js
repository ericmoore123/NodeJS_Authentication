const express = require('express');
const router  = express.Router();

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

                console.log(newUser)
                res.send('Pass!')
            }
        });
    }

});

module.exports = router;