import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CustomersListView from './screens/Customers/CustomersListView';

ReactDOM.render(
  <React.StrictMode>
    <CustomersListView />
  </React.StrictMode>,
  document.getElementById('root')
);
