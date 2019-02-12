const Eater = require('../models/eater')
const Trucker = require('../models/trucker')
var config = require('./config')
const GoogleStrategy = require("passport-google-token").Strategy;

const gstrategy = new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        if (req.body.loginType === "eater") {
            Eater.upsertGoogleUser(accessToken, refreshToken, profile, function (err, user) {
                return done(err, user);
            });
        } else {
            Trucker.upsertGoogleUser(accessToken, refreshToken, profile, function (err, user) {
                return done(err, user);
            });
        }
    }
);

module.exports = gstrategy