const User = require('./User');
const Bet = require('./Bet');
const Card = require('./Card');
const HandResult = require('./HandResult');
const Table = require('./Table');
const TablePlayer = require('./TablePlayer');

//User belongsTo TablePlayer
User.belongsTo(TablePlayer, {
  foreignKey: 'tablePlayer_id'
});

//TablePlayer hasOne User
TablePlayer.hasOne(User, {
  foreignKey: 'tablePlayer_id'
})

//TablePlayer belongsTo Table
TablePlayer.belongsTo(Table, {
  foreignKey: 'table_id'
})

//Table hasMany TablePlayers
Table.hasMany(TablePlayer, {
  foreignKey: 'table_id',
  onDelete: 'CASCADE'
})

//TablePlayer has many Bets
TablePlayer.hasMany(Bet, {
  foreignKey: 'tablePlayer_id'
})

//Bets belongTo TablePlayer
Bet.belongsTo(TablePlayer, {
  foreignKey: 'tablePlayer_id'
})

//Bet hasOne HandResult
Bet.hasOne(HandResult, {
  foreignKey: 'bet_id'
})

//HandResult belongs to Bet
HandResult.belongsTo(Bet, {
  foreignKey: 'bet_id'
})

//TablePlayer has many Cards
TablePlayer.hasMany(Card, {
  foreignKey: 'tablePlayer_id'
})

//Card belongsTo TablePlayer
Card.belongsTo(TablePlayer, {
  foreignKey: 'tablePlayer_id'
})

//Card belongs to Table
Card.belongsTo(Table, {
  foreignKey: 'table_id'
})

//Table has many Cards
Table.hasMany(Card, {
  foreignKey: 'table_id',
  onDelete: 'CASCADE'
})


module.exports = {
  User,
  Bet,
  Card,
  HandResult,
  Table,
  TablePlayer
};
