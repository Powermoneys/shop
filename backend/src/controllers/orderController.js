const Order = require('../models/order');
const { authenticate } = require('../middlewares/auth');

// Создание контроллера
const orderController = {};

// Создание заказа
orderController.createOrder = async (req, res) => {
  try {
    const { totalPrice, items, username } = req.body;
    // Все необходимые поля заполнены
    if (totalPrice && items && username) {
      // Новый объект заказа с данными из запроса
      const order = new Order({
        totalPrice,
        items,
        username,
      });

      await order.save();

      res.status(201).json({ message: 'Order added successfully', order });
    } else {
      res.status(400).json({ error: 'Missing fields' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'An error occurred', 
      name: error.name, // Тип ошибки
      message: error.message, // Сообщение об ошибке
      stack: error.stack // Стек вызовов
    });
  }
};

module.exports = orderController;
