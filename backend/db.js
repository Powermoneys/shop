const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.REACT_APP_DATABASE,
  process.env.REACT_APP_USERNAME,
  process.env.REACT_APP_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.REACT_APP_HOST,
    port: process.env.REACT_APP_DBPORT,
  }
);
