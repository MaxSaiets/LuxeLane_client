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

const App = observer(() => {
  const [theme, colorMode] = useMode();

  const { userStore, basketStore, catalogStore, recentryViewedStore, favoritesStore } = useContext(RootStoreContext);


  useEffect(() => {
    const fetchInitialData = async () => {
      await userStore.checkAuth();
    };
    
    catalogStore.getCatalogCategoriesData();
    
    fetchInitialData();

  }, [userStore]);

  useEffect(() => {
    
    if (userStore.isAuth) {
      basketStore.fetchUserBasket(userStore.user.id);
      favoritesStore.fetchUserFavorites(userStore.user.id);
      // recentryViewedStore.fetchRecentlyViewedProducts({ userId: userStore.user.id, allInformation: true });
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