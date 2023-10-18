// const { Sequelize } = require("sequelize");

// module.exports = new Sequelize(
//   process.env.REACT_APP_DATABASE,
//   process.env.REACT_APP_USERNAME,
//   process.env.REACT_APP_PASSWORD,
//   {
//     dialect: "postgres",
//     host: process.env.REACT_APP_HOST,
//     port: process.env.REACT_APP_DBPORT,
//   }
// );


const { Pool } = require("pg");

const connectionString =
  "postgresql://postgres:fzXT2yZpdhjJ56C2KyNf@containers-us-west-180.railway.app:7224/railway";

const pool = new Pool({
  connectionString,
});

module.exports = pool;
