const express = require('express');
const orderController = require('../controllers/orderController');

// Создание роутера
const orderRouter = express.Router();

// Настройка маршрутов с использованием контроллеров
orderRouter.post('/', orderController.createOrder);

module.exports = orderRouter;
