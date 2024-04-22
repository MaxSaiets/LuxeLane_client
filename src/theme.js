import { createTheme } from "@mui/material";
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
                },
                cardWrapper: {
                  border: "#a09f9f"
                },
                background: {
                  main: "#cecece",
                  myDrawer: "#a09f9f",
                  btnClose: "grey",
                }}
              : {
                primary: {
                  main: "#4a4a4a"
                },
                text: { 
                  main: "#fff"
                },

            }),
        },
        breakpoints: {
          values: {
            xs: 0,
            ssm: 400,
            sm: 600,
            md: 900,
            leftBar: 1100,
            lg: 1200,
            xl: 1536,
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

    return [theme, colorMode];
}