const express = require('express');
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express();

// Tells express to make use of cookies in our application
app.use(
    cookieSession({
        // How long cookie can exist before expiring in miliseconds (30 days below)
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // Encrypts the cookie. Its an array so you can provide multiple keys
        // And a key is randomly chosen
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);