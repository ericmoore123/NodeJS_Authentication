const express = require('express');
const router  = express.Router();

// Login Route Page
router.get('/login', (req, res) => res.send("Login"));

// Register Route Page
router.get('/Register', (req, res) => res.send("Register"));

module.exports = router;