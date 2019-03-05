const router = require("express").Router();
const eatersController = require("../../controllers/eatersController");

// Counts the number of eaters with a particular favorite
// Matches with "/api/eaters/favcount"
router.route("/favcount")
  .post(eatersController.findEatersWithFav);

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

// Pulls favorites from array
// Matches with "/api/eaters/removefav/:id"
router
.route("/removefav/:id")
.put(eatersController.removeFav);

module.exports = router;
