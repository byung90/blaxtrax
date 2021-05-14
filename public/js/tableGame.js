let minimum_bet;
let bet_amount = 0;
let tablePlayers = [];
let table_id;
let dealer_hand_id;
let player_hand_id;


const loadTable = async () => {
  const getTableData = await fetch('/api/gameRoutes/table/1', {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  });

  if (getTableData.ok) {
    const tableData = await getTableData.json();
    minimum_bet = tableData.minimum_bet;
    bet_amount = minimum_bet;
    tablePlayers = tableData.tablePlayers;
    table_id = tableData.table_id;
    console.log(tableData);
  }
}

const increaseBet = () => {
  if (tablePlayers[1].user.balance >= (10 + bet_amount)) {
    bet_amount += 10;
  }
}

const decreaseBet = () => {
  if (bet_amount >= 10) {
    bet_amount -= 10;
  }
}

const dealCards = async () => {
  const dealCardsData = await fetch('/api/gameRoutes/makeBets', {
    method: 'POST',
    body: JSON.stringify({
      table_id: table_id,
      tablePlayers: [
        {
          id: tablePlayers[0].id,
          bet_amount: 0,
          position: 0
        },
        {
          id: tablePlayers[1].id,
          bet_amount: bet_amount,
          position: 1
        }
      ]
    }),
    headers: { "Content-Type": "application/json" }
  });

  if (dealCardsData.ok) {
    const dealCards = await dealCardsData.json();
    dealer_hand_id = dealCards.tablePlayers[0].hand.id;
    player_hand_id = dealCards.tablePlayers[1].hand.id;
    console.log(dealCards);
    console.log(dealer_hand_id);
    console.log(player_hand_id);
  }
}

const addCard = async (player_type) => {
  let handId;
  if (player_type === 'player') {
    handId = player_hand_id;
  }
  else {
    handId = dealer_hand_id;
  }
  const addCardData = await fetch('/api/gameRoutes/addCard', {
    method: 'POST',
    body: JSON.stringify({
      tableId: table_id,
      handId: handId
    }),
    headers: { "Content-Type": "application/json" }
  });

  if (addCardData.ok) {
    const newCard = await addCardData.json();
    console.log(newCard);
  }
}



loadTable();