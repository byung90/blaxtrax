const router = require("express").Router();
const userRoutes = require("./userRoutes");
const LeaderRoutes = require("./leaderBoard");
const tableGame = require("./tableGame");

router.use("/users", userRoutes);
router.use("/leaderBoard", LeaderRoutes);
//router.use("/tableGame", tableGame);

module.exports = router;
