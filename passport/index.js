
const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const GoogleStrategy = require('./googleStrategy')
const FacebookStrategy = require('./facebookStrategy')
const Eater = require('../models/eater')


passport.serializeUser((eater, done) => {
  console.log("=== serialize ... called ===");
  console.log(eater); // the whole raw eater object!
  console.log("---------");
  done(null, { _id: eater._id });
});

passport.deserializeUser((id, done) => {
  console.log("DEserialize ... called");
  Eater.findOne(
    { _id: id },
    "firstName lastName photos local.username",
    (err, eater) => {
      console.log("======= DESERILAIZE USER CALLED ======");
      console.log(eater);
      console.log("--------------");
      done(null, eater);
    }
  );
});

// ==== Register Strategies ====
passport.use(LocalStrategy);

passport.use(GoogleStrategy);
passport.use(FacebookStrategy);

module.exports = passport;
