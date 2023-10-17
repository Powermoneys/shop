import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import './Item.css';

function Item({ item }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Добавление товара в корзину с помощью redux
    dispatch(addToCart(item));
  };

  return (
    <div className="item">
      <img src={'./img/' + item.productimage + '.png'} alt={item.productname} />
      <h3>{item.productname}</h3>
      <p>{item.price} руб.</p>
      <button onClick={handleAddToCart}>Добавить в корзину</button>
    </div>
  );
}

export default Item;
