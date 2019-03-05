const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const GoogleStrategy = require('./googleStrategy')
const FacebookStrategy = require('./facebookStrategy')
const Eater = require('../models/eater')

passport.serializeUser(function (user, done) {
    done(null, user)
})
passport.deserializeUser(function (user, done) {
    done(null, user)
})

// ==== Register Strategies ====
passport.use(LocalStrategy);
passport.use(FacebookStrategy);
passport.use(GoogleStrategy);

module.exports = passport
