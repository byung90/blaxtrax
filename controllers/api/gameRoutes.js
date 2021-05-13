const router = require("express").Router();
const { User, TablePlayer, Table, Bet, Hand, Card } = require("../../models");

const newHand = require('../../utils/deal');

//deal card
router.post("/gameStart", async (req, res) => {
  try {
    const hand_id = await newHand();
    console.log('done');
    res.status(200).json(hand_id);
  } catch (err) { }

});

//need get the user date (current balance.)
//need post new date after user won/lose, and update DB user balance
//

module.exports = router;
