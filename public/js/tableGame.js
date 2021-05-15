let minimum_bet;
let bet_amount = 0;
let tablePlayers = [];
let table_id;
let dealer_hand_id;
let player_hand_id;
let dealer_cards = [];
let player_cards = [];
let isInGame = false;
let player_balance;
let user_id;

const loadTable = async () => {
  console.log(window.location);
  table_id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  const getTableData = await fetch('/api/gameRoutes/table/' + table_id, {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  });

  if (getTableData.ok) {
    const tableData = await getTableData.json();
    minimum_bet = tableData.minimum_bet;
    bet_amount = minimum_bet;
    tablePlayers = tableData.tablePlayers;
    table_id = tableData.table_id;
    player_balance = tableData.tablePlayers[1].user.balance;
    user_id = tableData.tablePlayers[1].user_id;
    $("#balance").text(`Balance: ${player_balance}`);
    $("#bet-amount").text(`Currently Betting: ${minimum_bet}`);
    console.log(tableData);
  }
}

const increaseBet = () => {
  console.log(tablePlayers[1].user.balance);
  if (tablePlayers[1].user.balance >= (10 + bet_amount)) {
    bet_amount += 10;
    $("#bet-amount").text(`Currently Betting: ${bet_amount}`);
  }
}

const decreaseBet = () => {
  if (bet_amount >= (minimum_bet + 10)) {
    bet_amount -= 10;
    $("#bet-amount").text(`Currently Betting: ${bet_amount}`);
  }
}

const dealCards = async () => {
  // Check if there are enough cards to play
  const isPlayableData = await fetch('/api/gameRoutes/1/isPlayable', {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  });

  if (isPlayableData.ok) {
    const isPlayabe = await isPlayableData.json();
    if (isPlayabe) {
      isInGame = true;
      console.log(table_id);
      const dealCardsData = await fetch('/api/gameRoutes/makeBets', {
        method: 'POST',
        body: JSON.stringify({
          tableId: table_id,
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
        dealer_cards = dealCards.tablePlayers[0].hand.cards.map(card => card);
        player_cards = dealCards.tablePlayers[1].hand.cards.map(card => card);

        //remove placeholder cards
        $('#dealer-hand').children().remove();
        $('#player-hand').children().remove();

        // display dealer cards
        $('#dealer-hand').append(`<img class="dealerCard" src="../img/cards/BG.png" alt="Dealer_hideCard">`);
        $('#dealer-hand').append(`<img class="dealerCard" src="../img/cards/${dealer_cards[1]}.png" alt="Dealer_hideCard">`);

        // display player cards
        $('#player-hand').append(`<img class="dealerCard" src="../img/cards/${player_cards[0]}.png" alt="Dealer_hideCard">`);
        $('#player-hand').append(`<img class="dealerCard" src="../img/cards/${player_cards[1]}.png" alt="Dealer_hideCard">`);

        // enable hit and stand
        $("#hit").attr('disabled', false);
        $("#stand").attr('disabled', false);
        $("#bet-more").attr('disabled', true);
        $("#bet-less").attr('disabled', true);

        // check if player has blackjack
        const cardTotal = await checkCardTotal(player_type);
        if (cardTotal[1] === 21) {
          playerWins();
          // enable to make new bet
          $("#bet-more").attr('disabled', false);
          $("#bet-less").attr('disabled', false);
        }
      }
    }
    else {
      // out of cards
      const resetCards = await fetch('/api/gameRoutes/resetDeck/1', {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
      });
      dealCards();
    }
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
    if (player_type === 'player') {
      player_cards.push(newCard.newCard);
      $('#player-hand').append(`<img class="dealerCard" src="../img/cards/${newCard.newCard}.png" alt="Dealer_hideCard">`);
    }
    else {
      dealer_cards.push(newCard.newCard);
      $('#dealer-hand').append(`<img class="dealerCard" src="../img/cards/${newCard.newCard}.png" alt="Dealer_hideCard">`);
    }

    if (player_type === 'player') {
      const cardTotal = await checkCardTotal(player_type);
      if (cardTotal[0] > 21 && cardTotal[1] > 21) {
        //disable hit and stand CTA
        $("#hit").attr('disabled', true);
        $("#stand").attr('disabled', true);
        dealerWins();
      }
      if (cardTotal[1] === 21) {
        playerWins();
      }
    }

  }
}

// playDealer function
const playDealer = () => {
  //disable hit and stand CTA
  $("#hit").attr('disabled', true);
  $("#stand").attr('disabled', true);
  // reveal hidden card
  $('#dealer-hand').children().remove();
  $('#dealer-hand').append(`<img class="dealerCard" src="../img/cards/${dealer_cards[0]}.png" alt="Dealer_hideCard">`);
  $('#dealer-hand').append(`<img class="dealerCard" src="../img/cards/${dealer_cards[1]}.png" alt="Dealer_hideCard">`);

  // check card total
  const playerTotal = checkCardTotal('player');
  let biggerPlayerNumber = playerTotal[1];

  if (playerTotal[1] > 21) {
    biggerPlayerNumber = playerTotal[0];
  }
  const dealerTimer = setInterval(dealerPlay, 1000);

  function dealerPlay() {
    const cardTotal = checkCardTotal('dealer');
    console.log(cardTotal);
    if (cardTotal[1] === 21) {
      dealerWins();
      clearInterval(dealerTimer);
    }
    else if (cardTotal[0] > 21 || cardTotal[1] > 21) {
      playerWins();
      clearInterval(dealerTimer);
    }
    else if (cardTotal[0] > 16 || cardTotal[1] > 16) {
      let biggerDealerNumber = cardTotal[1];

      if (cardTotal[1] > 21) {
        biggerDealerNumber = cardTotal[0];
      }

      if (biggerDealerNumber < biggerPlayerNumber) {
        playerWins();
      }
      else if (biggerDealerNumber > biggerPlayerNumber) {
        dealerWins();
      }
      else {
        const tieModal = new bootstrap.Modal(document.getElementById("tie-modal"), {});
        tieModal.show();
      }
      clearInterval(dealerTimer);
    }
    else {
      addCard('dealer');
    }
  }


}

// dealer wins treatment
const dealerWins = () => {
  //prompt loss
  const loserModal = new bootstrap.Modal(document.getElementById("lose-modal"), {});
  loserModal.show();
  //update balance
  player_balance -= bet_amount;
  updateBalance(player_balance);
  $("#balance").text(`Balance: ${player_balance}`);
  // enable to make new bet
  $("#bet-more").attr('disabled', false);
  $("#bet-less").attr('disabled', false);
}

// player wins treatment
const playerWins = () => {
  const winnerModal = new bootstrap.Modal(document.getElementById("win-modal"), {});
  winnerModal.show();
  //update balance
  player_balance += bet_amount;
  updateBalance(player_balance);
  $("#balance").text(`Balance: ${player_balance}`);
  $("#bet-more").attr('disabled', false);
  $("#bet-less").attr('disabled', false);
}

const updateBalance = async (balance) => {
  const newUserBalanceData = await fetch('/api/gameRoutes/updateBalance', {
    method: 'PUT',
    body: JSON.stringify({
      id: user_id,
      balance: balance
    }),
    headers: { "Content-Type": "application/json" }
  });

  console.log(newUserBalanceData.json());
}

const checkCardTotal = (player_type) => {
  let cardTotal = [0, 0];
  let cardsToAdd;
  console.log("hhhhhhhhhh");
  console.log(player_type);
  if (player_type === 'player') {
    cardsToAdd = player_cards;
  }
  else {
    cardsToAdd = dealer_cards;
  }
  cardsToAdd.forEach(card => {
    const firstChar = card.slice(0, 1);
    if (!isNaN(Number(firstChar))) {
      cardTotal[0] += Number(firstChar);
      cardTotal[1] += Number(firstChar);
    }
    else {
      if (firstChar !== 'A') {
        cardTotal[0] += 10;
        cardTotal[1] += 10;
      }
      else {
        cardTotal[0] += 1;
        cardTotal[1] += 11;
      }
    }
  })
  return cardTotal;
}

const quitGame = async () => {
  const leaveGameObject = {
    tableId: table_id,
    userId: user_id
  }
  const leaveGame = await fetch('/api/gameRoutes/quitTable', {
    method: 'DELETE',
    body: JSON.stringify(leaveGameObject),
    headers: { "Content-Type": "application/json" }
  });

  if (leaveGame.ok) {
    window.location.href = window.location.origin + "/profile";
  }

}

loadTable();