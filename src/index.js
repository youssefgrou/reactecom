import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables.mjs';

import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import 'datatables.net-responsive-dt/js/responsive.dataTables.mjs';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './app.css'; 
import './components/frontend/home.css'

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token'); 
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

window.addEventListener('DOMContentLoaded', event => {
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
      sidebarToggle.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.toggle('sb-sidenav-toggled');
          localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      });
  }
});

reportWebVitals();
