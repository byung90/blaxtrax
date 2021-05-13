const router = require("express").Router();
const { User, TablePlayer, Table, Bet, Hand, Card } = require("../../models");

const newHand = require('../../utils/deal');

//create hand object to start game
router.post("/gameStart", async (req, res) => {
  /*req.body
  {
    table_id
  }
  */
  try {
    //call table to get dealer and TablePlayer(s)

    //create hands for dealer and TablePlayer(s)

    //create bets for dealer and TablePlayer(s) - dealer will have 0 bet amount and result will always be 'dealer'

    //deal cards to all players
    const hand_id = await newHand();
    res.status(200).json(hand_id);
  } catch (err) {
    res.status(500).json(err);
  }

});



//need get the user date (current balance.)
//need post new date after user won/lose, and update DB user balance
//

module.exports = router;
