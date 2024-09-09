import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import CardWrapperSimle from "../CardWrapperSimple/CardWrapperSimple";

import { useTheme, useMediaQuery } from '@mui/material';

import { USERFAVORITES_ROUTE } from "../../../utils/consts";
import { useNavigate } from "react-router-dom";


const CardsList = ({itemsCount, data, showAllItems = false}) => {
    const navigate = useNavigate();
    const [showItems, setShowAllItems] = useState(showAllItems);

    const theme = useTheme(); 
    
    const matches1920 = useMediaQuery(theme.breakpoints.down('xxl'));
    const matches1536 = useMediaQuery(theme.breakpoints.down('xl'));
    const matches1200 = useMediaQuery(theme.breakpoints.down('lg'));
    const matches900 = useMediaQuery(theme.breakpoints.down('md'));
    const matches800 = useMediaQuery(theme.breakpoints.down('msm'));
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    const matches400 = useMediaQuery(theme.breakpoints.down('ssm'));
    const matches450 = useMediaQuery(theme.breakpoints.down('ssmm'));
    
    if (matches600) {
      itemsCount = 2;
    } else if (matches800) {
      itemsCount = 4;
    } else if (matches900) {
      itemsCount = 4;
    } else if (matches1200) {
      itemsCount = 5;
    } else if (matches1536) {
      itemsCount = 5;
    } else if (matches1920) {
      itemsCount = 6;
    }

    const [visibleItemCount, setVisibleItemCount] = useState(itemsCount);


    const visibleItems = showItems ? data : data.slice(0, visibleItemCount)

    const itemValue = (100 - 4) / itemsCount;
    const itemWidth = `${itemValue}%`;
    const gapItemsPreValue = `calc(4% / ${itemsCount})`;
    const gapItemsValue = `calc((4% + ${gapItemsPreValue}) / ${itemsCount})`;

    const handleUserFavoritesClick = () => {
      navigate(USERFAVORITES_ROUTE);
    };

    const handleShowMoreClick = () => {
      setVisibleItemCount(prevCount => prevCount + itemsCount);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", rowGap: "10px", width: "100%"}}>
          {visibleItems.map((item, index) => (
            <Box key={index} sx={{ flex: `0 0 ${itemWidth}`, boxSizing: "border-box", marginRight: index % itemsCount === itemsCount - 1 ? "0px" : gapItemsValue }}>
                <CardWrapperSimle product={item} />
            </Box>
          ))}

          {!showAllItems && (
            <Box sx={{ width: "100%", justifyContent: "right", display: "flex", flexDirection: matches450 ? "column" : "row", gap: "10px" }}>
              <Button
                variant="outlined"
                color="info"
                onClick={handleUserFavoritesClick}
                size="small"
                sx={{ width: matches450 ? "100%" : matches600 ? "50%" : "auto" }}
              >
                Показати всі продукти
              </Button>

              {!showItems && data.length > visibleItemCount && (
                <Button
                  variant="outlined"
                  color="info"
                  onClick={handleShowMoreClick}
                  size="small"
                  sx={{ width: matches450 ? "100%" : matches600 ? "50%" : "auto" }}
                >
                  Показати більше продуктів
                </Button>
              )}
            </Box>
          )}
        </Box>
      );
};

export default CardsList