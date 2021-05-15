const router = require("express").Router();
const userRoutes = require("./userRoutes");
const leaderRoutes = require("./leaderBoard");
const gameRoutes = require("./gameRoutes");
const cardRoutes = require("./cardRoutes");
const handRoutes = require("./handRoutes");
const betRoutes = require("./betRoutes");
const tableRoutes = require('./tableRoutes');

router.use("/users", userRoutes);
router.use("/leaderBoard", leaderRoutes);
router.use("/gameRoutes", gameRoutes);
router.use("/card", cardRoutes);
router.use("/hand", handRoutes);
router.use("/bet", betRoutes);
router.use("/table", tableRoutes);

module.exports = router;
