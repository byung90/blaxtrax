const router = require("express").Router();
const userRoutes = require("./userRoutes");
const LeaderRoutes = require("./leaderBoard");

router.use("/users", userRoutes);
router.use("/leaderBoard", LeaderRoutes);

module.exports = router;
