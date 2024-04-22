// axios - для того щоб відправляти запроси на сервер
// react-router-dom -  для постраничной навигации
// mobx - стейт менеджер  "для отслеживания и управления данными, которые могут изменяться в процессе работы приложения"
// mobx-react-lite - щоб звязати mobx з функціональними компонентами reacta

import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import CatalogStore from './store/CatalogStore';
import InfoUserBlocksStore from './store/InfoUserBlocksStore';
import './firebase';

export const UserStoreContext = createContext(null);
export const DeviceStoreContext = createContext(null);
export const CatalogStoreContext = createContext(null);
export const InfoUserBlocksStoreContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserStoreContext.Provider value={new UserStore()}>
    <DeviceStoreContext.Provider value={new DeviceStore()}>
      <CatalogStoreContext.Provider value={new CatalogStore()}>
        <InfoUserBlocksStoreContext.Provider value={new InfoUserBlocksStore()}>
          <App />
        </InfoUserBlocksStoreContext.Provider>
      </CatalogStoreContext.Provider>
    </DeviceStoreContext.Provider>
  </UserStoreContext.Provider>
);