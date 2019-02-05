const router = require("express").Router();
const eatersController = require("../../controllers/eatersController");
const passport = require('passport');

router.put(
  "/",
  function (req, res, next)  {
    console.log("routes/eater.js, login, req.body: ");
    console.log(req.body);
    next()
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.body.username);
    var eaterInfo = {
      username: req.body.username
    };
    res.send(eaterInfo);
  }
)
// Matches with "/api/eaters"
router.route("/")
  .get(eatersController.findAll)
  .post(eatersController.create);

// Matches with "/api/eaters/:id"
router
  .route("/:id")
  .get(eatersController.findById)
  .put(eatersController.update)
  .delete(eatersController.remove);

module.exports = router;
