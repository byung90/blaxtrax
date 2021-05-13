const router = require("express").Router();
const { User, TablePlayer, Table, Bet, Hand, Card } = require("../../models");
const { newHand, getTable } = require('../../utils/deal');

function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property])
      return 1;
    else if (a[property] < b[property])
      return -1;

    return 0;
  }
}

//Get basic table info and players in the game.
router.get("/table/:id", async (req, res) => {
  /* example response json format
  {
    "tablePlayers": [
      {
        "id": 1,
        "table_id": 1,
        "user_id": 1,
        "user": {
          "id": 1,
          "name": "Dealer 5",
          "balance": 5000
        }
      },
      {
        "id": 10,
        "table_id": 1,
        "user_id": 9,
        "user": {
          "id": 9,
          "name": "Dwyane",
          "balance": 5000
        }
      }
    ]
  }
  */
  try {
    //call table to get dealer and TablePlayer(s)
    const tableData = await getTable(req.params.id);

    const tableGameStatus = tableData.is_in_game;
    const tablePlayers = tableData.tablePlayers;
    let tablePlayersClean = tablePlayers.map(x => x.get({ plain: true }));
    tablePlayersClean.sort(sortByProperty('id'));
    console.log(tablePlayersClean);

    const returnData = {
      tablePlayers: tablePlayersClean,
      isInGame: tableGameStatus
    }

    res.status(200).json(returnData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get table status
router.get('/tableStatus/:id', async (req, res) => {
  try {

  }
  catch (err) {

  }
})

//create hands for dealer and TablePlayer(s)

//create bets for dealer and TablePlayer(s) - dealer will have 0 bet amount and result will always be 'dealer'

//deal cards to all players

module.exports = router;
