const router = require("express").Router();
const eatersController = require("../../controllers/eatersController");

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
