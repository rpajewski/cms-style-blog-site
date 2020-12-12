const Sequelize = require('sequelize');

require('dotenv').config();

const { DB_NAME, DB_USER, DB_PW, JAWSDB_URL } = process.env;

// create connection to our db
let sequelize;

if (JAWSDB_URL) {
  sequelize = new Sequelize(JAWSDB_URL);
} else {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;