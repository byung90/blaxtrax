const router = require("express").Router();
const { Bet } = require("../../models");

// Update Bet Results
router.put('/updateBetResults', async (req, res) => {
  /* Example req.body
  {
    [
      {
        bet_id: 1,
        amount: 50,
        result: win,
        tablePlayer: 1,
        position: 1
      },
      {
        bet_id: 2,
        amount: 50,
        result: lose,
        tablePlayer: 2,
        position: 2
      }
    ]
  }
  */
  try {
    let betToBeUpdated = [];
    req.body.forEach(bet => {
      const betTemp = {
        id: bet.bet_id,
        result: bet.result,
        table_player_id: bet.tablePlayer,
        amount: bet.amount,
        position: bet.position
      }
      console.log(betTemp);
      betToBeUpdated.push(betTemp);
    })
    console.log(betToBeUpdated);
    const updatedBetData = await Bet.bulkCreate(betToBeUpdated, { updateOnDuplicate: ['result'] }
    )
    console.log(updatedBetData);

    res.status(200).json("updated");
  }
  catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
