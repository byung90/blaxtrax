const { Hand } = require('../models');

const newHand = async (req, res, next) => {
  try {
    console.log('test');
    const handData = await Hand.create({});
    console.log(handData);
    res.end();

  }
  catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = newHand;