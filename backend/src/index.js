require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sequelize = require('./db');
const User = require('./models/user');
const Item = require('./models/item');
const Order = require('./models/order');


const app = express();
const port = process.env.REACT_APP_PORT || 5000;

app.use(express.json());
app.use(cors());

User.sync()
  .then(() => {
    console.log('User table created successfully');
  })
  .catch((error) => {
    console.error(error);
  });

Item.sync()
  .then(() => {
    console.log('Item table created successfully');
  })
  .catch((error) => {
    console.error(error);
  });

Order.sync()
  .then(() => {
    console.log('Order table created successfully');
  })
  .catch((error) => {
    console.error(error);
  });

// Функция для проверки аутентификации пользователя по токену
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Функция для проверки роли пользователя (админ или нет)
const authorize = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }
  next();
};

app.post('/order', async (req, res) => {
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
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Проверка наличия имени пользователя, электронной почты и пароля
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Проверка уникальности имени пользователя и электронной почты
    const userExists = await User.findOne({
      where: { username },
    });
    if (userExists) {
      return res.status(400).json({ error: 'Username already taken' });
    }
    const emailExists = await User.findOne({
      where: { email },
    });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Хеширование пароля с помощью bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя в базе данных
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user',
    });

    // Генерация токена с помощью jwt
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'secret',
      { expiresIn: '1h' }
    );

    // Отправка ответа с сообщением и токеном
    res.status(201).json({
      message: `User ${user.username} registered successfully`,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Проверка наличия имени пользователя и пароля
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Поиск пользователя в базе данных по имени пользователя
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Сравнение пароля с хешем в базе данных с помощью bcrypt
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    // Генерация токена с помощью jwt
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'secret',
      { expiresIn: '1h' }
    );

    // Отправка ответа с сообщением и токеном
    res.status(200).json({
      message: `User ${user.username} logged in successfully`,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/items', authenticate, authorize, async (req, res) => {
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
});

app.put('/items/:id', authenticate, authorize, async (req, res) => {
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
});

app.delete('/items/:id', authenticate, authorize, async (req, res) => {
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
});

app.get('/items', async (req, res) => {
  try {
    // Выполнение запроса SELECT для получения всех товаров из базы данных
    const items = await Item.findAll();

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
