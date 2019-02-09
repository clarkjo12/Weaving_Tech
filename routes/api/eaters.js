const router = require("express").Router();
const eatersController = require("../../controllers/eatersController");
const passport = require('passport');

router.post("/login",
  function (req, res, next) {
    console.log("routes/eater.js, login: ");
    console.log(req.body);
    console.log(req.params.username + " " + req.params.password);
    next()
  },
  passport.authenticate("local"),
  (request, res) => {
    console.log("logged in", request.body.username);
    var eaterInfo = {
      _id: request.session.passport.user._id,
    };
    console.log(eaterInfo);
    console.log();
    res.send(eaterInfo);
  }
);

// Matches with "/api/eaters"
router.route("/")
  .get(eatersController.findAll)
  .post(eatersController.create);

// Matches with "/api/eaters/loc/:id"
router
  .route("/loc/:id")
  .put(eatersController.updateLoc);

// Matches with "/api/eaters/fav/:id"
router
  .route("/fav/:id")
  .put(eatersController.updateFav);

module.exports = router;
