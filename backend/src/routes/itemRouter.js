const express = require('express');
const itemController = require('../controllers/itemController');
const { authenticate, authorize } = require('../middlewares/auth');

// Создание роутера
const itemRouter = express.Router();

// Настройка маршрутов с использованием контроллеров
itemRouter.post('/', authenticate, authorize, itemController.createItem);
itemRouter.put('/:id', authenticate, authorize, itemController.updateItem);
itemRouter.delete('/:id', authenticate, authorize, itemController.deleteItem);
itemRouter.get('/', itemController.listItems);

module.exports = itemRouter;
