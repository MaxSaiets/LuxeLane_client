import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './firebase';

import RootStoreProvider from './store/RootStoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RootStoreProvider>
    <App />
  </RootStoreProvider>
);