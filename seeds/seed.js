const sequelize = require("../config/connection");
const { User } = require("../models");
const userData = require("./userData.json");
const dealerData = require("./dealerUserData.json");
const seedTables = require("./tables-seed.js");
const seedTablePlayers = require("./tablePlayer-seeds.js");


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(dealerData, {
    individualHooks: true,
    returning: true,
  });

  await seedTables();
  await seedTablePlayers();

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
