const router = require("express").Router();
const userRoutes = require("./userRoutes");
const leaderRoutes = require("./leaderBoard");
const gameRoutes = require("./gameRoutes");
const cardRoutes = require("./cardRoutes");

router.use("/users", userRoutes);
router.use("/leaderBoard", leaderRoutes);
router.use("/gameRoutes", gameRoutes);
router.use("/card", cardRoutes);

module.exports = router;
