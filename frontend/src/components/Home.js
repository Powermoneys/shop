import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import './Home.css';

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Получение данных о товарах с backend
    axios
      .get('http://localhost:5000/items')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="home">
      <h1>Спортивные товары</h1>
      <div className="home__items">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
