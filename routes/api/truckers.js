const router = require("express").Router();
const truckersController = require("../../controllers/truckersController");

// Matches with "/api/truckers"
router.route("/")
  .get(truckersController.findTrucks)
  .post(truckersController.create);

// Matches with "/api/truckers/:id"
router.route("/:id")
  .get(truckersController.findTruck)
  .put(truckersController.update);

module.exports = router;
