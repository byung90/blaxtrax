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

    const isInGame = tableData.is_in_game;
    const isDealerCardRevealed = tableData.is_dealer_card_revealed;
    const tablePlayers = tableData.tablePlayers;
    let tablePlayersClean = tablePlayers.map(x => x.get({ plain: true }));
    tablePlayersClean.sort(sortByProperty('id'));
    console.log(tablePlayersClean);

    const returnData = {
      tablePlayers: tablePlayersClean,
      isInGame: isInGame,
      isDealerCardRevealed: isDealerCardRevealed
    }

    res.status(200).json(returnData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get table status and load game
router.get('/tableStatus', async (req, res) => {
  try {
    /* 
    example req body : 
    {
      table_id: 1,
      isInGame: true,
      tablePlayerIds:[1,2],
    }
    -------------------
    example response json if inGame is false
    {
      tablePlayers : [
        {
          id: 1,
          bet: 0,
          hand_id: 1
          cards: []
        },
        {
          id: 9,
          bet: 10,
          hand_id: 2
          cards: []
        },
      ]
    }
    -------------------
    example response json if inGame is true
    {
      tablePlayers : [
        {
          id: 1,
          bet: 0,
          hand_id: 1
          cards: [1,2]
        },
        {
          id: 9,
          bet: 10,
          hand_id: 2
          cards: [5,6]
        },
      ]
    }
    */

    //fetch hands and cards for dealer and TablePlayer(s)
    if (req.params.isInGame) {

    }
    // creat hands for dealer and TablePlayer(s)
    else {

    }

  }
  catch (err) {

  }
})

//create hands for dealer and TablePlayer(s)

//create bets for dealer and TablePlayer(s) - dealer will have 0 bet amount and result will always be 'dealer'

//deal cards to all players

module.exports = router;
