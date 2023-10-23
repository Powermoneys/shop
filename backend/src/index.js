// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const User = require('./models/user');
const Item = require('./models/item');
const Order = require('./models/order');

// Импорт роутеров
const userRouter = require('./routes/userRouter');
const itemRouter = require('./routes/itemRouter');
const orderRouter = require('./routes/orderRouter');

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

// Подключение роутеров
app.use('/users', userRouter);
app.use('/items', itemRouter);
app.use('/order', orderRouter);

app.get('/about', function (request, response) {
  response.send('О сайте');
});

app.get('/', function (request, response) {
  response.send('Главная страница');
});

app.use(function (req, res, next) {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
