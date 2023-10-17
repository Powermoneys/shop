
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Auth from './components/Auth';
import Admin from './components/Admin';

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
