const router = require("express").Router();
const { User, TablePlayer, Table, Bet, Hand, Card } = require("../../models");
const { createHands, getTable, createBets, getCard, getUniqueCard } = require('../../utils/deal');

function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property])
      return 1;
    else if (a[property] < b[property])
      return -1;

    return 0;
  }
}

const cardArrayMap = ['CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'DA', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 'HA', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK'];

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

// Get load game if table is in game
router.get('/loadInGame', async (req, res) => {
  try {
    /* 
    example req body : 
    {
      table_id: 1,
      isInGame: true,
      tablePlayerIds:[1,2],
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
    // create hands for dealer and TablePlayer(s)
    else {

    }

  }
  catch (err) {

  }
})

//Deal first hand
router.post('/makeBets', async (req, res) => {
  /* 
  example req body:
  {
    tableId: 1,
    tablePlayers: [
      {
        id: 1,
        bet_amount: 0
      },
      {
        id: 9,
        bet_amount: 50
      }
    ]
  }
  */
  try {
    // create Bets for TablePlayer(s)
    let betsToCreate = [];
    for (let i = 0; i < req.body.tablePlayers.length; i++) {
      betsToCreate[i] = {
        amount: req.body.tablePlayers[i].bet_amount,
        tablePlayer_id: req.body.tablePlayers[i].id
      }
      if (req.body.tablePlayers[i].id < 9) {
        betsToCreate[i].result = 'dealer'
      }
      else {
        betsToCreate[i].result = 'inPlay'
      }
    }
    const betsData = await createBets(betsToCreate);

    const betsCleanData = betsData.map(x => x.get({ plain: true }));
    betsCleanData.sort(sortByProperty('tablePlayer_id'));
    console.log("bets:")
    console.log(betsCleanData);

    // create Hands for Each Bet
    let handsToCreate = [];

    for (let i = 0; i < betsCleanData.length; i++) {
      handsToCreate[i] = {
        bet_id: betsCleanData[i].id
      }
    }
    console.log("hands:")
    console.log(handsToCreate);
    const handsData = await createHands(handsToCreate);
    const handsCleanData = handsData.map(x => x.get({ plain: true }));
    console.log(handsCleanData);

    //deal cards to hands
    let cleanCardData = [];
    // const randomCardIndex = await getUniqueCard(req.body.tableId)
    // console.log(randomCardIndex);
    // console.log(req.body.tableId);
    for (let i = 0; i < handsCleanData.length; i++) {
      for (let j = 0; j < 2; j++) {
        const randomCardIndex = await getUniqueCard(req.body.tableId)
        console.log(randomCardIndex);
        const cardToCreate = {
          hand_id: handsCleanData[i].id,
          cardArrayIndex: randomCardIndex
        }
        const cardsData = await getCard(cardToCreate);
        console.log(cardsData);
        cleanCardData.push(cardsData.get({ plain: true }));
      }
    }

    console.log(cleanCardData);

    res.status(200).json(cleanCardData);
  }
  catch (err) {
    res.status(500).json(err);
  }
})
//create hands for dealer and TablePlayer(s)

//create bets for dealer and TablePlayer(s) - dealer will have 0 bet amount and result will always be 'dealer'

//deal cards to all players

module.exports = router;
