const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Eaters = mongoose.model('Eater');

passport.use(new LocalStrategy(
    function(username, password, done) {
      Eaters.findOne({ username: username }, function (err, eater) {
        if (err) { return done(err); }
        if (!eater) { return done(null, false); }
        if (!eater.verifyPassword(password)) { return done(null, false); }
        return done(null, eater);
      });
    }
  ));
