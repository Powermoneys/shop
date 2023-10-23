const express = require('express');
const userController = require('../controllers/userController');

// Создание роутера
const userRouter = express.Router();

// Настройка маршрутов с использованием контроллеров
userRouter.route('/create').post(userController.createUser);
userRouter.route('/login').post(userController.loginUser);


module.exports = userRouter;
