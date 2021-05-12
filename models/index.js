const User = require('./User');
const Bet = require('./Bet');
const Card = require('./Card');
const Hand = require('./Hand');
const Table = require('./Table');
const TablePlayer = require('./TablePlayer');

//User hasOne TablePlayer
User.hasOne(TablePlayer, {
  foreignKey: 'user_id'
});

//TablePlayer belongsTo User
TablePlayer.belongsTo(User, {
  foreignKey: 'user_id'
})

//TablePlayers belongTo Table
TablePlayer.belongsTo(Table, {
  foreignKey: 'table_id'
})

//Table hasMany TablePlayers
Table.hasMany(TablePlayer, {
  foreignKey: 'table_id'
})

//TablePlayer hasOne bet
TablePlayer.hasOne(Bet, {
  foreignKey: 'tablePlayer_id'
})

//Bet belongsTo TablePlayer
Bet.belongsTo(TablePlayer, {
  foreignKey: 'tablePlayer_id'
})

//Bet belongsTo Hand
Bet.belongsTo(Hand, {
  foreignKey: 'hand_id'
})

//Hand hasOne Bet
Hand.hasOne(Bet, {
  foreignKey: 'hand_id'
})

// Card belongsTo Hand
Card.belongsTo(Hand, {
  foreignKey: 'hand_id'
})

//Hand hasMany Cards
Hand.hasMany(Card, {
  foreignKey: 'hand_id'
})



module.exports = {
  User,
  Bet,
  Card,
  Hand,
  Table,
  TablePlayer
};
