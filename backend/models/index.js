const dbConfig = require("../config/config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  logging: false // Optional: menonaktifkan log query di konsol
});

// Inisialisasi objek db
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models dan berikan sequelize instance
db.transactions = require("./transaction.model.js")(sequelize, DataTypes);
db.users = require("./user.model.js")(sequelize, DataTypes);

module.exports = db;
