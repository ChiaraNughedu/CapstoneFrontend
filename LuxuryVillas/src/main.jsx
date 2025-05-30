import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  
      <App />
  
    </Provider>
);
