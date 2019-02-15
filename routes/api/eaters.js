const router = require("express").Router();
const eatersController = require("../../controllers/eatersController");

// Matches with "/api/eaters"
router.route("/")
  .post(eatersController.create);

// Matches with "/api/eaters/favcount"
router.route("/favcount")
  .post(eatersController.findEatersWithFav);

// Matches with "/api/eaters/count"
router.route("/count")
  .post(eatersController.findEater);

// Matches with "/api/eaters/loc/:id"
router
  .route("/loc/:id")
  .put(eatersController.updateLoc);

// Matches with "/api/eaters/favs/:id"
router
  .route("/favs/:id")
  .get(eatersController.getFavs);

  // Matches with "/api/eaters/fav/:id"
router
  .route("/fav/:id")
  .put(eatersController.updateFav);

module.exports = router;
