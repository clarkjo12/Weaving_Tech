const router = require("express").Router();
const eaterRoutes = require("./eaters");
const truckerRoutes = require("./truckers");

// Eater routes
router.use("/eaters", eaterRoutes);

// Trucker routes
router.use("/truckers", truckerRoutes);

module.exports = router;
