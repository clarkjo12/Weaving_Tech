const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const GoogleStrategy = require('./googleStrategy')
const FacebookStrategy = require('./facebookStrategy')
const Eater = require('../models/eater')

// ==== Register Strategies ====
passport.use(LocalStrategy);
passport.use(FacebookStrategy);
passport.use(GoogleStrategy);

module.exports = passport
