const User = require('../models/eater')
var config = require('./config')
const GoogleStrategy = require("passport-google-token").Strategy;

const gstrategy = new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret
},
    function (accessToken, refreshToken, profile, done) {
        User.upsertGoogleUser(accessToken, refreshToken, profile, function (err, user) {
            return done(err, user);
        });
    }
);

module.exports = gstrategy