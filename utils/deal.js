const { Hand, Bet, Table, TablePlayer, User, Card } = require('../models');

const createHands = async (hands) => {
  try {
    const handData = await Hand.bulkCreate(hands);
    return handData;
  }
  catch (err) {
    return (err);
  }
}

const getAllHandsInTable = async (tableId) => {
  try {
    const handData = await Table.findByPk(tableId, {
      include: [
        {
          model: TablePlayer, include: [
            {
              model: Bet, include: [
                {
                  model: Hand, include: [
                    {
                      model: Card
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    })
  }
  catch (err) {

  }
}

const getTable = async (id) => {
  try {
    const tableData = await Table.findByPk(id, {
      include: [{ model: TablePlayer, include: [{ model: User, attributes: ['id', 'name', 'balance'] }] }]
    })
    return tableData;
  }
  catch (err) {
    return (err);
  }
}

const createBets = async (betAmounts) => {
  try {
    const betData = await Bet.bulkCreate(betAmounts, {
      individualHooks: true,
      returning: true,
    });
    return betData
  }
  catch (err) {
    return (err);
  }
}

const getCard = async (card) => {
  // Check and assign if randomCardIndex does not exist
  try {
    const cardData = await Card.create(card);
    return cardData;
  }
  catch (err) {
    return err;
  }
}

// getUnqiueCard
const getUniqueCard = async (tableId) => {
  try {
    // Check and assign if randomCardIndex does not exist
    let randomCardIndex;
    let doesRandomCardIndexExist = true;
    while (doesRandomCardIndexExist) {
      randomCardIndex = Math.floor(Math.random() * 52);
      const checkRandomCardIndexExist = await Card.findOne({
        include: [
          {
            model: Hand, include: [
              {
                model: Bet, include: [
                  {
                    model: TablePlayer, include: [
                      {
                        model: Table, where: {
                          id: tableId
                        }
                      }
                    ],
                  },
                ]
              },
            ]
          },
        ],
        where: {
          cardArrayIndex: randomCardIndex
        }
      })
      if (checkRandomCardIndexExist === null) {
        doesRandomCardIndexExist = false;
      }
    }
    return randomCardIndex;
  }
  catch (err) {
    return err
  }
}

module.exports = {
  createHands,
  getTable,
  createBets,
  getUniqueCard,
  getCard
};