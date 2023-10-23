// Импорт модулей
const Item = require('../models/item');
const { authenticate, authorize } = require('../middlewares/auth');

// Создание контроллера
const itemController = {};

// Действие для создания товара
itemController.createItem = async (req, res) => {
  try {
    const { productname, price, productimage } = req.body;

    // Проверка наличия названия, цены и изображения товара
    if (!productname || !price || !productimage) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Выполнение запроса INSERT для добавления товара в базу данных
    const item = await Item.create({
      productname,
      price,
      productimage,
    });

    res.status(201).json({ message: 'Item added successfully', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Действие для обновления товара
itemController.updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const { productname, price, productimage } = req.body;

    // Проверка наличия названия, цены и изображения товара
    if (!productname || !price || !productimage) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Выполнение запроса UPDATE для изменения товара в базе данных
    const item = await Item.update(
      {
        productname,
        price,
        productimage,
      },
      {
        where: { id },
        returning: true,
      }
    );

    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Действие для удаления товара
itemController.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;

    // Выполнение запроса DELETE для удаления товара из базы данных
    await Item.destroy({
      where: { id },
    });

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Действие для получения списка товаров
itemController.listItems = async (req, res) => {
  try {
    // Выполнение запроса SELECT для получения всех товаров из базы данных
    const items = await Item.findAll();

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Экспорт контроллера
module.exports = itemController;
