const Eater = require('../models/eater')
const Trucker = require('../models/trucker')
const FacebookStrategy = require('passport-facebook-token');

const FCLIENTID = process.env.REACT_APP_FACEBOOK_CLIENT_ID;
const FCLIENTSECRET = process.env.REACT_APP_FACEBOOK_CLIENT_SECRET;
const FCALLBACKURL = process.env.REACT_APP_FACEBOOK_CALLBACK_URL;


const fstrategy = new FacebookStrategy({
    clientID: `${FCLIENTID}`,
    clientSecret: `${FCLIENTSECRET}`,
    passReqToCallback: `${FCALLBACKURL}`
},
    function (req, accessToken, refreshToken, profile, done) {
        if (req.body.loginType === "eater") {
            Eater.upsertFbUser(accessToken, refreshToken, profile, function (err, user) {
                return done(err, user);
            });
        }
        else {
            Trucker.upsertFbUser(accessToken, refreshToken, profile, function (err, user) {
                return done(err, user);
            });
        }
    }
);

module.exports = fstrategy