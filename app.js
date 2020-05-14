const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const app = express();

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

