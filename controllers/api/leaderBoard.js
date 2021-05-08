const router = require("express").Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const topFive = await User.findAll({
      limit: 5,
      order: [["balance", "DESC"]], //ASC
    });
    res.status(200).json(topFive);
  } catch (err) {
    console.log("Error");
    res.status(400).json(err);
  }
});

module.exports = router;
