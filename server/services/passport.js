const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys')
const mongoose = require('mongoose')

// Load something into the model
const User = mongoose.model('users')

// User is the Mongoose model
passport.serializeUser((user, done) => {
    // user.id is the ID that is assigned to the record by MongoDB, not the profile ID
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then( user => {
        // User is the user model pulled from MongoDB
        done(null, user)
    })
})

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    (accessToken, refreshToken, profile, done) => {
        // Searches through the records for one that has that profile.id
        // It is an async action so it returns a promise
        User.findOne({ googleID: profile.id }).then(existingUser => {
            if(existingUser) {
                // Already have a record with the given profile.id
                // Passport wants to use the done function to know that the final 
                // steps are complete
                // It takes an err message and the user data
                done(null, existingUser);
            } else {
                // We don't have a user record with this ID, make a new one
                // Creates a new instance of a record and save it to the database
                // It is an async function so we need to waiti until it resolves before calling
                // the done function
                new User({ googleID: profile.id }).save().then(user => done(null, user))
            }
        })
        }
    )   
);