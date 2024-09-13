import { createTheme, GlobalStyles } from "@mui/material";

import { createContext, useMemo, useState } from "react";

export const themeSettings = (mode) => {

    return {
        palette: {
            mode,
            ...(mode === 'light'
              ? {
                primary: {
                  main: "#cecece"
                },
                secondary: {
                  main: "#cfcfcf"
                },
                leftBar: {
                  main: "#e1e1e1"
                },
                text: {
                  main: "#000",
                  mainPageBlocksTitles: "#000",
                },
                cardWrapper: {
                  border: "#a09f9f"
                },
                background: {
                  main: "#cecece",
                  white: "#ffffff",
                  myDrawer: "#a09f9f",
                  btnClose: "grey",
                },
                cartIcons:{
                  main: "#30a4c1",
                  active: "#ff0000"
                },
                btnPrevNextSliderProductPageBottom: {
                  main: "#000000"
                }
              }
              : {
                primary: {
                  main: "#4a4a4a"
                },
                leftBar: {
                  main: "#979595"
                },
                text: { 
                  main: "#fff",
                  mainPageBlocksTitles: "#ffffff",
                },
                cartIcons:{
                  main: "#30a4c1",
                  active: "#ff0000"
                },
                btnPrevNextSliderProductPageBottom: {
                  main: "#ffffff"
                }
            }),
        },
        breakpoints: {
          values: {
            xs: 0,
            ssm: 400,
            ssmm: 450,
            smm: 500,
            sm: 600,
            msm: 800,
            md: 900,
            leftBar: 1100,
            lg: 1200,
            xl: 1536,
            xxl: 1920,
          },
        },
    }
}

export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState(() => {
        const savedMode = window.localStorage.getItem("colorMode");
        return savedMode ? savedMode : "light";
    });

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prev) => {
                    const newMode = prev === "light" ? "dark" : "light";
                    window.localStorage.setItem("colorMode", newMode);
                    return newMode;
                });
            },
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    const globalStyles = (
      <GlobalStyles
          styles={{
              ':root': {
                  '--btnPrevNextSliderProductPageBottom': theme.palette.btnPrevNextSliderProductPageBottom.main,
              }
          }}
      />
  );

  return [theme, colorMode, globalStyles];
}