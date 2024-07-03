import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes,Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import MasterLayout from './layouts/admin/MasterLayout';

import AdminRoute from './routes/AdminRoute';

import About from './components/frontend/About';
import Contact from './components/frontend/Contact';
import ViewCategory from './components/frontend/Collections/ViewCategory';
import ProductDetails from './components/frontend/Collections/ProductDetails';
import Cart from './components/frontend/Cart';
import Checkout from './components/frontend/Checkout';
import ThankYou from './components/frontend/Thankyou';



function App() {
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>{/* Optional text next to spinner */}</p> 
      </div>
    );
  }

  return (
    <div className="App">
      
      <Routes>

        <Route exact path="/home" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
        <Route path="/collections" Component={ViewCategory} />
        <Route path="/collections/:category/:product" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />

        
        <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to='/home' /> : <Login />} />
        <Route path="/register" element={localStorage.getItem('auth_token') ? <Navigate to='/home' /> : <Register />} />
        <Route path="/admin/*" element={<AdminRoute />}>
            <Route path="*" element={<MasterLayout />} />
        </Route>
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;

