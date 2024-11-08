import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HashRouter } from 'react-router-dom';

import AppRouter from "./components/Routers/AppRouter";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "./store/RootStoreProvider";

import NavBar from "./components/NavBar/NavBar";

import { ColorModeContext, useMode} from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { Box } from "@mui/system";

import "./index.css";
import "./reset.css";
import AdminPanel from "./pages/AdminPanel";

import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

import { fetchFilteredProducts } from "./http/productApi";

const App = observer(() => {
  const [theme, colorMode, globalStyles] = useMode();

  const { userStore, basketStore, catalogStore, recentryViewedStore, favoritesStore } = useContext(RootStoreContext);

  useEffect(() => {
    const fetchInitialData = async () => {
      await userStore.checkAuth();
    };
    
    catalogStore.getCatalogCategoriesData();
    
    fetchInitialData();

  }, []);

  useEffect(() => {
    if (userStore.isAuth) {
      basketStore.fetchUserBasket();
      favoritesStore.fetchUserFavorites({fetchAllProducts: true});
      recentryViewedStore.fetchRecentlyViewedProducts({fetchAllProducts: true}); //default 20, productDataCount = 20
    }
  }, [userStore.isAuth]);

  if (userStore.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <HashRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {globalStyles}

          <div className="app">
            <main className="content">
              
              <NavBar />
              
              <Box
                sx={{ 
                  maxWidth: "1920px",
                  margin: "0 auto",
                  padding: {}
                }}
              >
                
                <Routes>
                  <Route path="/admin/*" element={<AdminPanel />} />
                  <Route path="/*" element={<AppRouter />} />
                </Routes>
              </Box>

            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </HashRouter>
  );
});

export default App;
