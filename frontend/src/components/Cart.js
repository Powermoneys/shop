import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions';
import './Cart.css';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [order, setOrder] = useState(null);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const getTotalPrice = () => {
    // Подсчет общей стоимости товаров в корзине
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const handleOrder = () => {
    // Обработка заказа товаров в корзине
    const orderData = {
      username: localStorage.getItem('username'),
      totalPrice: getTotalPrice(),
      items: cart.map((item) => item.id),
    };
    setOrder(orderData);
  };

  useEffect(() => {
    // POST запрос при изменении значения order
    if (order) {
      // Объект с параметрами запроса
      const requestOptions = {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': localStorage.getItem('token')
          },
        body: JSON.stringify(order),
      };

      fetch(`${process.env.REACT_APP_SERVER_URL}order`, requestOptions)
        .then((response) => {
          if (response.ok) {
            alert('Order added successfully');
          } else {
            alert('An error occurred');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('An error occurred');
        });
    }
  }, [order]);

  return (
    <div className="cart">
      <h1>Корзина</h1>
      {cart.length > 0 ? (
        <>
          <div className="cart__items">
            {cart.map((item) => (
              <div key={item.id} className="cart__item">
                <img src={'./img/' + item.productimage + '.png'} alt={item.productname} />
                <h3>{item.productname}</h3>
                <p>{item.price} руб.</p>
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  Удалить из корзины
                </button>
              </div>
            ))}
          </div>
          <div className="cart__summary">
            <h2>Итого: {getTotalPrice()} руб.</h2>
            <button onClick={handleOrder}>Заказать</button>
          </div>
        </>
      ) : (
        <p>Ваша корзина пуста</p>
      )}
    </div>
  );
}

export default Cart;
