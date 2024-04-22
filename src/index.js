import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Item from './component/Item_Page'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Item/>
  </React.StrictMode>
);
