const express = require('express');
const itemController = require('../controllers/itemController');

// Создание роутера
const itemRouter = express.Router();

// Настройка маршрутов с использованием контроллеров
itemRouter.post('/', itemController.createItem);
itemRouter.put('/:id', itemController.updateItem);
itemRouter.delete('/:id', itemController.deleteItem);
itemRouter.get('/', itemController.listItems);

module.exports = itemRouter;
