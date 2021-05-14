const router = require("express").Router();
const sequelize = require('../../config/connection');
const { QueryTypes } = require('sequelize');
const { Hand } = require("../../models");

router.post('/', async (req, res) => {
  const handData = await Hand.create({});
  res.status(200).json(handData);
});

router.get('/test', async (req, res) => {
  try {

    const checkRandomCardIndexExists = await sequelize.query("SELECT card_array_index FROM card JOIN hand ON card.hand_id = hand.id JOIN bet ON bet.id = hand.bet_id JOIN tablePlayer ON tablePlayer.id = bet.table_player_id JOIN `table` ON table.id = tablePlayer.table_id WHERE table.id=? and card.card_array_index=?", {
      replacements: [1, 53],
      nest: false,
      raw: true,
      type: QueryTypes.SELECT
    })
    console.log(checkRandomCardIndexExists);
    res.status(200).json(checkRandomCardIndexExists);
  }
  catch (err) {
    res.status(500).json(err);
  }

});


module.exports = router;