import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

// Thiết lập URL cơ sở cho tất cả các yêu cầu axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
console.log("API URL:", axios.defaults.baseURL);

// Kiểm tra token từ localStorage và thiết lập trong header nếu tồn tại
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);