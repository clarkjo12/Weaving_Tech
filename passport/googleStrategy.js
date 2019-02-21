const Eater = require('../models/eater')
const Trucker = require('../models/trucker')
const GoogleStrategy = require("passport-google-token").Strategy;

const GCLIENTID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GCLIENTSECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const GCALLBACKURL = process.env.REACT_APP_GOOGLE_CALLBACK_URL;

const gstrategy = new GoogleStrategy({
    clientID: `${GCLIENTID}`,
    clientSecret: `${GCLIENTSECRET}`,
    passReqToCallback: `${GCALLBACKURL}`
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