import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Footer from './components/Footer';
import TopNav from './components/TopNav'
import Product from './components/Product';
import Orders from './components/Orders';
import { useState } from 'react';
import Checkout from './components/Checkout';
import Reset from './components/Reset';
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const[pshow, setpShow] = useState(false);
  return (
    <div className="App container">
      <BrowserRouter>
          <TopNav setpState={setpShow}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reset" element={<Reset />} />
          </Routes>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
