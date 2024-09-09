import React from "react";
import { observer } from "mobx-react-lite";

import { Box } from "@mui/material";
import { useTheme, useMediaQuery } from '@mui/material';

import LeftBar from "../LeftBar/LeftBar";

import ProductsListForBasket from "./ProductsListForBasket/ProductsListForBasket";

const BasketContent = observer(() => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("leftBar"));
    
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <Box sx={{width: "100%", height: "auto", display: "flex", flexDirection: "row", paddingBottom: matches600 ? "56px" : undefined }}>

            {!isSmallScreen && (
                <Box sx={{ width: "240px" }}>
                    <LeftBar />
                </Box>
            )}

            <Box sx={{ width: isSmallScreen ? "100%" : "calc(100% - 240px)", padding: matches600 ? "20px" : "15px 30px" }}>
                <ProductsListForBasket />
            </Box>
 
        </Box>
    );
});

export default BasketContent;