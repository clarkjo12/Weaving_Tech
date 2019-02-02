const router = require("express").Router();
const truckersController = require("../../controllers/truckersController");

// Matches with "/api/truckers"
router.route("/")
  .get(truckersController.findAll)
  .post(truckersController.create);

// Matches with "/api/truckers/:id"
router
  .route("/:id")
  .get(truckersController.findById)
  .put(truckersController.update)
  .delete(truckersController.remove);

module.exports = router;
