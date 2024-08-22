import React, { createContext } from 'react';

import UserStore from './UserStore';
import BasketStore from './BasketStore';
import CatalogStore from './CatalogStore';
import InfoUserBlocksStore from './InfoUserBlocksStore';
import RecentryViewedStore from './RecentryViewedStore';
import FavoritesStore from './FavoritesStore';
import DeviceStore from './DeviceStore';

export const RootStoreContext = createContext(null);

const RootStoreProvider = ({ children }) => {
  const rootStore = {
    userStore: new UserStore(),
    basketStore: new BasketStore(),
    catalogStore: new CatalogStore(),
    infoUserBlocksStore: new InfoUserBlocksStore(),
    recentryViewedStore: new RecentryViewedStore(),
    favoritesStore: new FavoritesStore(),
    deviceStore: new DeviceStore(),
  };

  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStoreProvider;
