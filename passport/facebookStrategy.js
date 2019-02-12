const Eater = require('../models/eater')
const Trucker = require('../models/trucker')
var config = require('./config')
const FacebookStrategy = require('passport-facebook-token');

const fstrategy = new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        if (req.body.loginType === "eater") {
            Eater.upsertFbUser(accessToken, profile, function (err, user) {
                return done(err, user);
            });
        }
        else {
            Trucker.upsertFbUser(accessToken, profile, function (err, user) {
                return done(err, user);
            });
        }
    }
);

module.exports = fstrategy