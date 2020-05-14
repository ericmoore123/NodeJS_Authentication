// mongodb+srv://user_1:<password>@cluster0-z5f20.mongodb.net/test?retryWrites=true&w=majority
const express = require('express')
const app = express();

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 1111; 

app.listen(PORT, console.log(`Server Initiated on port ${PORT}`));

