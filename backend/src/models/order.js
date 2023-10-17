const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// Определение модели Order с полями id, totalPrice и items
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  items: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Order;
