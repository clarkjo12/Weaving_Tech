const User = require('../models/eater')
var config = require('./config')
const FacebookStrategy = require('passport-facebook-token');

const fstrategy = new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret
},
    function (accessToken, refreshToken, profile, done) {
        User.upsertFbUser(accessToken, refreshToken, profile, function (err, user) {
            return done(err, user);
        });
    }
)

module.exports = fstrategy