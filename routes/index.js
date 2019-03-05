const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const passport = require('passport');
const User = require('../models/eater')
var { generateToken, sendToken } = require('../utils/token.utils');

// API Routes
router.use("/api", apiRoutes);

router.route('/auth/facebook')
  .post(passport.authenticate('facebook-token', { session: false }), function (req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      _id: req.user._id,
      username: req.user.username
    };
    next();
  }, generateToken, sendToken);

router.route('/auth/google')
  .post(passport.authenticate('google-token', { session: false }), function (req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      _id: req.user._id,
      username: req.user.username
    };
    next();
  }, generateToken, sendToken);


router.route('/api/eaters/login')
  .post(passport.authenticate('local'), function (req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      _id: req.user._id,
      username: req.user.username
    };
    next();
  }, generateToken, sendToken);

router.post('/api/eaters/signup', function (req, res) {
  var body = req.body,
    username = body.username,
    password = body.password,
    location = body.location;
  User.findOne({
    username: username
  }, function (err, doc) {
    if (err) {
      res.status(500).send('error occured')
    } else {
      if (doc) {
        res.status(500).send('Username already exists')
      } else {
        var record = new User()
        record.username = username;
        record.password = record.hashPassword(password)
        record.location = location
        record.save(function (err, user) {
          if (err) {
            res.status(500).send('db error')
          }
          req.auth = {
            _id: user._id,
            username: user.username
          };
          return res.status(200).send(req.auth);
        })
      }
    }
  })
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;