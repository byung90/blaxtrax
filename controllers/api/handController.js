const router = require("express").Router();
const { Hand } = require("../../models");

router.post('/', async (req, res) => {
  const handData = await Hand.create({});
});

module.exports = router;