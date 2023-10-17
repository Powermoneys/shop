import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const [items, setItems] = useState([]); // Список товаров
  const [productname, setProductname] = useState(''); // Название товара
  const [price, setPrice] = useState(''); // Цена товара
  const [productimage, setProductimage] = useState(''); // Изображение товара
  const [message, setMessage] = useState(''); // Сообщение об ошибке или успехе

  useEffect(() => {
    // Получение данных о товарах с backend
    axios
      .get('http://localhost:5000/items', {
        headers: {
          authorization: localStorage.getItem('token'), // Передача токена в заголовке запроса
        },
      })
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddItem = () => {
    // Обработка добавления товара
    axios
      .post(
        'http://localhost:5000/items',
        {
          productname,
          price,
          productimage,
        },
        {
          headers: {
            authorization: localStorage.getItem('token'), // Передача токена в заголовке запроса
          },
        }
      )
      .then((response) => {
        setMessage(response.data.message);
        setItems([...items, response.data.item]); // Добавление нового товара в список
      })
      .catch((error) => {
        setMessage(error.response.data.error);
      });
  };

  const handleEditItem = (id) => {
    // Обработка изменения товара
    axios
      .put(
        `http://localhost:5000/items/${id}`,
        {
          productname,
          price,
          productimage,
        },
        {
          headers: {
            authorization: localStorage.getItem('token'), // Передача токена в заголовке запроса
          },
        }
      )
      .then((response) => {
        setMessage(response.data.message);
        setItems(
          items.map((item) =>
            item.id === id ? response.data.item[1][0] : item // Обновление измененного товара в списке
          )
        );
      })
      .catch((error) => {
        setMessage(error.response.data.error);
      });
  };

  const handleDeleteItem = (id) => {
    // Обработка удаления товара
    axios
      .delete(`http://localhost:5000/items/${id}`, {
        headers: {
          authorization: localStorage.getItem('token'), // Передача токена в заголовке запроса
        },
      })
      .then((response) => {
        setMessage(response.data.message);
        setItems(items.filter((item) => item.id !== id)); // Удаление удаленного товара из списка
      })
      .catch((error) => {
        setMessage(error.response.data.error);
      });
  };

  return (
    <div className="admin">
      <h1>Страница администратора</h1>
      <p>{message}</p>
      <div className="admin__form">
        <label>Название товара</label>
        <input
          type="text"
          value={productname}
          onChange={(e) => setProductname(e.target.value)}
        />
        <label>Цена товара</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Изображение товара</label>
        <input
          type="text"
          value={productimage}
          onChange={(e) => setProductimage(e.target.value)}
        />
        <button onClick={handleAddItem}>Добавить товар</button>
      </div>
      <div className="admin__items">
        {items.map((item) => (
          <div key={item.id} className="admin__item">
            <img src={'./img/' + item.productimage + '.png'} alt={item.productname} />
            <h3>{item.productname}</h3>
            <p>{item.price} руб.</p>
            <button onClick={() => handleEditItem(item.id)}>Изменить товар</button>
            <button onClick={() => handleDeleteItem(item.id)}>Удалить товар</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
