import React, { createContext, useMemo } from 'react';

import UserStore from './UserStore';
import BasketStore from './BasketStore';
import CatalogStore from './CatalogStore';
import InfoUserBlocksStore from './InfoUserBlocksStore';
import RecentryViewedStore from './RecentryViewedStore';
import FavoritesStore from './FavoritesStore';

export const RootStoreContext = createContext(null);

const RootStoreProvider = ({ children }) => {
  const rootStore = useMemo(() => {
    const userStore = new UserStore();
    const basketStore = new BasketStore();
    const catalogStore = new CatalogStore();
    const infoUserBlocksStore = new InfoUserBlocksStore();
    const recentryViewedStore = new RecentryViewedStore();
    const favoritesStore = new FavoritesStore();

    userStore.setRootStore({
      clearAllStores: () => {
        userStore.clearStore();
        basketStore.clearStore();
        recentryViewedStore.clearStore();
        favoritesStore.clearStore();
      }
    });

    return {
      userStore,
      basketStore,
      catalogStore,
      infoUserBlocksStore,
      recentryViewedStore,
      favoritesStore,
      clearAllStores: () => {
        userStore.clearStore();
        basketStore.clearStore();
        catalogStore.clearStore();
        infoUserBlocksStore.clearStore();
        recentryViewedStore.clearStore();
        favoritesStore.clearStore();
      }
    };
  }, []);

  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStoreProvider;