const jwt = require('jsonwebtoken');

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

module.exports = { authenticate, authorize };
