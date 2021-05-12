const router = require("express").Router();
const { Card } = require("../../models");

const cardArrayMap = [CA, C2, C3, C4, C5, C6, C7, C8, C9, C10, CJ, CQ, CK, DA, D2, D3, D4, D5, D6, D7, D8, D9, D10, DJ, DQ, DK, HA, H2, H3, H4, H5, H6, H7, H8, H9, H10, HJ, HQ, HK, SA, S2, S3, S4, S5, S6, S7, S8, S9, S10, SJ, SQ, SK];

//Deal Card
router.post('/deal', async (req, res) => {
  /* request body: {
    hand_id,
    tablePlayer_id
  } */
  try {
    // Check and assign if randomCardIndex does not exist
    let randomCardIndex;
    let doesRandomCardIndexExist = true;
    while (doesRandomCardIndexExist) {
      randomCardIndex = Math.floor(Math.random() * 52);
      const checkRandomCardIndexExist = await Card.findOne({
        where: {
          cardArrayIndex: randomCardIndex
        }
      })
      if (checkRandomCardIndexExist === null) {
        doesRandomCardIndexExist = false;
      }
    }

    //Get correct cardArrayIndex
    const cardArrayIndex = cardArrayMap[randomCardIndex];

    const newCardObject = {
      cardArrayIndex: cardArrayIndex,
      hand_id: req.body.hand_id
    }

    const cardData = await Card.create(newCardObject)
    return res.status(200).json(cardData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
