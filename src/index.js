// axios - для того щоб відправляти запроси на сервер
// react-router-dom -  для постраничной навигации
// mobx - стейт менеджер  "для отслеживания и управления данными, которые могут изменяться в процессе работы приложения"
// mobx-react-lite - щоб звязати mobx з функціональними компонентами reacta

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