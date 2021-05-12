const { Hand } = require('../models');

const newHand = async (req, res) => {
  try {
    console.log('test');
    const handData = await Hand.create({});
    return res.json(handData);
  }
  catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = newHand;