import React from "react";
import { observer } from "mobx-react-lite";

import { Box } from "@mui/material";
import { useTheme, useMediaQuery } from '@mui/material';

import LeftBar from "../LeftBar/LeftBar";

import ProductsListForUserFavorites from "./ProductsListForUserFavorites/ProductsListForUserFavorites";

const BasketContent = observer(() => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("leftBar"));
    
    const matches900 = useMediaQuery(theme.breakpoints.down("md"));
    const matches600 = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box sx={{width: "100%", height: "auto", display: "flex", flexDirection: "row", paddingBottom: matches600 ? "56px" : undefined }}>

            {!isSmallScreen && (
            <Box sx={{ width: "240px" }}>
               <LeftBar />
            </Box>
            )}

            <Box sx={{ width: isSmallScreen ? "100%" : "calc(100% - 240px)", padding: matches900 ? "10px 15px" : "0px 30px" }}>
                <ProductsListForUserFavorites />
            </Box>
        </Box>
    );
});

export default BasketContent;