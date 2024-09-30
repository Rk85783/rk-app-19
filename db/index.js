const { Sequelize } = require('sequelize');

const database = process.env.DATABASE_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'postgres'
});
module.exports = sequelize;