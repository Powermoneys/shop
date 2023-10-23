const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  productimage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Item;