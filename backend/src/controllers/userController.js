const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { authenticate, authorize } = require('../middlewares/auth');

const userController = {};

// Функция для создания пользователя
userController.createUser = async (req, res) => {
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
};

// Функция для вывода списка пользователей
userController.loginUser = async (req, res) => {
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
};

module.exports = userController;
 