const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

// Passport config require
require('./config/passport')(passport);

// Database 
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;

// Connect to database using mongoose
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        console.log('Connection to database successful');
    })
    .catch((err) => {
        console.log("Error connecting to database")
    });

// Express Session Data
app.use(session({
    secret: 'spooky secret',
    resave: false,
    saveUninitialized: true
}));
    // Connect flash 
app.use(flash());

// Passport Usage Middleware
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
    res.locals.seccess_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    next()
});

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: false})); //Enableds request.body

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 1111; 

app.listen(PORT, console.log(`Server Initiated on port ${PORT}`));

