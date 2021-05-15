const router = require("express").Router();
const { User, TablePlayer, Table, Bet, Hand, Card } = require("../../models");
const { createHands, getTable, createBets, getCard, getUniqueCard, isDeckPlayable, updateBalance, resetCard } = require('../../utils/deal');

function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property])
      return 1;
    else if (a[property] < b[property])
      return -1;

    return 0;
  }
}

function findByProp(o, prop, val, retprop) {
  if (o == null) return false;
  if (o[prop] === val) {
    return (retprop) ? o[retprop] : o;
  }
  var result, p;
  for (p in o) {
    if (o.hasOwnProperty(p) && typeof o[p] === 'object') {
      result = findByProp(o[p], prop, val);
      if (result) {
        return (retprop) ? result[retprop] : result;
      }
    }
  }
  return (retprop) ? result[retprop] : result;
}


const cardArrayMap = ['AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC', 'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS'];

//Get basic table info and players in the game.
router.get("/table/:id", async (req, res) => {
  /* example response json format
  {
    "isDealerCardRevealed": false,
    "minimum_bet" : 10,
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
    const minBet = tableData.min_bet;
    const isInGame = tableData.is_in_round;
    const isDealerCardRevealed = tableData.is_dealer_card_revealed;
    const tablePlayers = tableData.tablePlayers;
    const tableId = tableData.id;
    let tablePlayersClean = tablePlayers.map(x => x.get({ plain: true }));
    tablePlayersClean.sort(sortByProperty('id'));
    console.log(tablePlayersClean);

    const returnData = {
      minimum_bet: minBet,
      tablePlayers: tablePlayersClean,
      isInGame: isInGame,
      isDealerCardRevealed: isDealerCardRevealed,
      table_id: tableId
    }

    res.status(200).json(returnData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deal first hand
router.post('/makeBets', async (req, res) => {
  /* 
  example req body:
  {
    tableId: 1,
    tablePlayers: [
      {
        id: 1,
        bet_amount: 0,
        position: 0
      },
      {
        id: 9,
        bet_amount: 50,
        position: 1
      }
    ]
  }
  =====================
  example response object
  {
    tablePlayer: [
      {
        id: 1,
        bet: {
          id: 9,
          amount: 0,
          position: 0,
          result: 'inPlay'
        },
        hand:{
          id: 20,
          cardIndexes: [0,51]
        }
      },
      {
        id: 8,
        bet: {
          id: 10,
          position: 1,
          amount: 50,
          result: 'inPlay'
        },
        hand:{
          id: 21,
          cardIndexes: [2,33]
        }
      },
    ]
  }
  */
  try {
    // response object
    let responseObject = {
      tablePlayers: [
        {
          id: req.body.tablePlayers[0].id
        },
        {
          id: req.body.tablePlayers[1].id
        }
      ]
    };

    console.log(responseObject);

    // create Bets for TablePlayer(s)
    let betsToCreate = [];
    for (let i = 0; i < req.body.tablePlayers.length; i++) {
      betsToCreate[i] = {
        amount: req.body.tablePlayers[i].bet_amount,
        tablePlayer_id: req.body.tablePlayers[i].id,
        position: req.body.tablePlayers[i].position
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
    betsCleanData.sort(sortByProperty('position'));
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
    for (let i = 0; i < handsCleanData.length; i++) {
      for (let j = 0; j < 2; j++) {
        const randomCardIndex = await getUniqueCard(req.body.tableId)
        console.log(randomCardIndex);
        const cardToCreate = {
          hand_id: handsCleanData[i].id,
          cardArrayIndex: randomCardIndex
        }
        console.log(cardToCreate);
        const cardsData = await getCard(cardToCreate);
        console.log(cardsData);
        cleanCardData.push(cardsData.get({ plain: true }));
      }
    }
    console.log(cleanCardData);

    // Set up response object
    betsCleanData.forEach((bet) => {
      const findHand = handsCleanData.find(hand => hand.bet_id === bet.id);
      responseObject.tablePlayers[bet.position].bet = {
        id: bet.id,
        position: bet.position,
        amount: bet.amount,
        result: bet.result
      }
      responseObject.tablePlayers[bet.position].hand = {
        id: findHand.id
      }
      let findCards = cleanCardData.filter(card => card.hand_id === findHand.id);
      findCards.sort(sortByProperty('id'));

      const findCardIndexs = findCards.map(card => cardArrayMap[card.cardArrayIndex]);

      responseObject.tablePlayers[bet.position].hand.cards = findCardIndexs;
    });
    console.log("check here:")
    console.log(responseObject);
    res.status(200).json(responseObject);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

// Add a card
router.post('/addCard', async (req, res) => {
  /* 
  example request body:
  {
    "tableId": 1,
    "handId": 1
  }
  */
  try {
    const uniqueCardIndex = await getUniqueCard(req.body.tableId);
    console.log("hiii");
    console.log(uniqueCardIndex);
    const cardToCreate = {
      hand_id: req.body.handId,
      cardArrayIndex: uniqueCardIndex
    }
    const createdCardData = await getCard(cardToCreate);
    const newCardIndex = createdCardData.cardArrayIndex;

    const responseObject = {
      newCard: cardArrayMap[newCardIndex]
    }

    res.status(200).json(responseObject);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Is deck playable - If cards left in deck are less than 10, it cannot be played
router.get('/:id/isPlayable', async (req, res) => {
  // :id is table Id
  try {
    const playable = await isDeckPlayable(req.params.id);
    res.status(200).json(playable);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/updateBalance', async (req, res) => {
  try {
    const newBalanceObject = {
      id: req.body.id,
      balance: req.body.balance
    }
    const updatedBalanceData = await updateBalance(newBalanceObject);
    res.status(200).json(updatedBalanceData);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/resetDeck/:id', async (req, res) => {
  try {
    const resetCardData = await resetCard(req.params.id);
    res.status(200).json(resetCardData);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
