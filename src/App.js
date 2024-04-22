import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRouter from "./components/Routers/AppRouter";
import { observer } from "mobx-react-lite";
import { UserStoreContext, CatalogStoreContext } from ".";
import { CircularProgress, Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";

import NavBar from "./components/NavBar/NavBar";

import { ColorModeContext, useMode} from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

import "./index.css";
import "./reset.css";
import AdminPanel from "./pages/AdminPanel";

const App = observer(() => {
  const [theme, colorMode] = useMode();

  const user = useContext(UserStoreContext)
  const catalog = useContext(CatalogStoreContext);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {

    catalog.getCatalogCategories();
    catalog.getCatalogSubCategories();

    const checkAuth = async () => {
      await user.checkAuth();
      setAuthChecked(true);
    };

    if (!user.isLoading) {
      checkAuth();
    } else {
      setAuthChecked(true);
    }
  }, [user]);

  // if (!user.isLoading) {
  //   return (
  //     <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
  //       <CircularProgress />
  //     </Grid>
  //   );
  // }

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <div className="app">
            <main className="content">
            
              <NavBar />
              
              <Routes>
                <Route path="/admin/*" element={<AdminPanel />} />
                <Route path="/*" element={<AppRouter />} />
              </Routes>

            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>     
  );
});

export default App;
// <Box sx={{display: "flex", flexDirection: isSmallScreen ? "column" : "row"}}>
//   <Box sx={{ width: "240px" }}>
//     <LeftBar />
//   </Box>
//   <Box sx={{ width: isSmallScreen ? "100%" : "calc(100% - 240px)" }}>
//     <AppRouter />
//   </Box>
// </Box>


// {isSmallScreen 
//   ?
//   <Box sx={{display: "flex", flexDirection: "column"}}>
//     <Box sx={{width: "100%", padding: " 0 30px", margin: "0 auto" }}>
//       <SliderSlick />
//     </Box>
//     <Box sx={{ width: "90%" }}>
//       <LeftBar />
//     </Box>
//     <Box sx={{ width: isSmallScreen ? "100%" : "calc(100% - 240px)" }}>
//       <AppRouter />
//     </Box>
//   </Box>
//   :
//   <Box sx={{display: "flex", flexDirection: "row"}}>
//     <Box sx={{ width: "240px" }}>
//       <LeftBar />
//     </Box>
//     <Box sx={{ width: "calc(100% - 240px)" }}>
//       <AppRouter />
//     </Box>
//   </Box>
// }

              // <Grid container direction={isSmallScreen ? "column" : "row"}>
              //   {isSmallScreen && <SliderSlick />}
              //   <Grid item xs={isSmallScreen ? 12 : 2}>
              //     <LeftBar />
              //   </Grid>
              //   <Grid item xs={isSmallScreen ? 12 : 10}>
              //     <AppRouter />
              //   </Grid>
              // </Grid>