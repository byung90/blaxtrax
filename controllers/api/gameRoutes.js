const router = require("express").Router();
const { User, TablePlayer, Table, Bet, Hand, Card } = require("../../models");
const newHand = require('../../utils/deal');

//deal card
router.get("/gameStart", newHand, async (req, res) => {
  try {

  } catch (err) { }
});

//need get the user date (current balance.)
//need post new date after user won/lose, and update DB user balance
//
module.exports = router;