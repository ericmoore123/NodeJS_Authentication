const express = require('express');
const router  = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Start Page
router.get('/', (req, res) => res.render("welcome"));

// Success Login Page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { 
        name: req.user.name //Give access to user details (name)
    });
});

module.exports = router;