import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">
          <img src="./img/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="header__nav">
        <ul className="header__nav__list">
        <li className="header__nav__item">
            <Link to="/admin">Админ</Link>
          </li>
        <li className="header__nav__item">
            <Link to="/auth">Авторизация</Link>
          </li>
          <li className="header__nav__item">
            <Link to="/cart">Корзина</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
