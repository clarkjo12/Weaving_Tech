const router = require("express").Router();
const eatersController = require("../../controllers/eatersController");

// Counts the number of eaters with a particular favorite
// Matches with "/api/eaters/favcount"
router.route("/favcount")
  .post(eatersController.findEatersWithFav);

// Finds eaters with a particular username
// Matches with "/api/eaters/count"
router.route("/count")
  .post(eatersController.findEater);

//Creates a new eater
//Matches with "/api/eaters"
router.route("/")
  .post(eatersController.create);

// Gets the eater favorites and checks against the truckers DB to see which ones are open
// Matches with "/api/eaters/favs/:id"
router
  .route("/favs/:id")
  .get(eatersController.getFavs);

// General find and update to eater
// Matches with "/api/eaters/:id"
router
  .route("/:id")
  .get(eatersController.find)
  .put(eatersController.update);

// Pushes more favorites to array
// Matches with "/api/eaters/fav/:id"
router
  .route("/fav/:id")
  .put(eatersController.updateFav);

module.exports = router;
