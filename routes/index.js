const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const passport = require('passport');
var { generateToken, sendToken } = require('../utils/token.utils');

// API Routes
router.use("/api", apiRoutes);

router.route('/auth/facebook')
  .post(passport.authenticate('facebook-token', { session: false }), function (req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id
    };
    next();
  }, generateToken, sendToken);

router.route('/auth/google')
  .post(passport.authenticate('google-token', { session: false }), function (req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id
    };
    next();
  }, generateToken, sendToken);


router.route('/api/eaters/login')
  .post(passport.authenticate('local', { session: false }), function (req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id
    };
    next();
  }, generateToken, sendToken);

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;