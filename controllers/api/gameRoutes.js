const router = require("express").Router();
const { User, TablePlayer, Table, Bet, Hand, Card } = require("../../models");

//deal card
router.get("/gameStart", async (req, res) => {
  try {

  } catch (err) { }
});

//need get the user date (current balance.)
//need post new date after user won/lose, and update DB user balance
//
