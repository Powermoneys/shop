import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

function Auth() {
  const [login, setLogin] = useState(true); // Флаг для переключения между регистрацией и входом
  const [username, setUsername] = useState(''); // Имя пользователя
  const [email, setEmail] = useState(''); // Электронная почта
  const [password, setPassword] = useState(''); // Пароль
  const [message, setMessage] = useState(''); // Сообщение об ошибке или успехе

  const handleRegister = () => {
    // Обработка регистрации пользователя
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}users/create`, {
        username,
        email,
        password,
      })
      .then((response) => {
        setMessage(response.data.message);
        setLogin(true); // Переключение на вход
      })
      .catch((error) => {
        setMessage(error.response.data.error);
      });
  };

  const handleLogin = () => {
    // Обработка входа пользователя
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}users/login`, {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem('username', username);
        console.log(localStorage.getItem('username'));
        setMessage(response.data.message);
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        setMessage(error.response.data.error);
      });
  };

  const handleLogout = () => {
    // Обработка выхода пользователя
    localStorage.clear();
    setMessage('Вы успешно вышли из системы');
  };

  return (
    <div className="auth">
      <h1>{login ? 'Вход' : 'Регистрация'}</h1>
      <p>{message}</p>
      <div className="auth__form">
        <label>Имя пользователя</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {!login && ( // Показывать поле email только при регистрации
          <>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}
        <label>Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {login ? (
          <>
            <button onClick={handleLogin}>Войти</button>
            <button onClick={() => setLogin(false)}>Зарегистрироваться</button>
            {localStorage.getItem('token') && ( // Показывать кнопку выхода только если есть токен в локальном хранилище
              <button onClick={handleLogout}>Выйти</button>
            )}
          </>
        ) : (
          <>
            <button onClick={handleRegister}>Зарегистрироваться</button>
            <button onClick={() => setLogin(true)}>Войти</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
