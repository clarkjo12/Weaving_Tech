const router = require("express").Router();
const truckersController = require("../../controllers/truckersController");

// Matches with "/api/truckers"
router.route("/")
  .get(truckersController.findAll)
  .post(truckersController.create);

// Matches with "/api/truckers/:id"
router
  .route("/loc/:id")
  .put(truckersController.updateLoc)

// Matches with "/api/truckers/fav/:id"
router
  .route("/fav/:id")
  .put(truckersController.updateFav);

module.exports = router;
