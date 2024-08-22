import React, {useState} from "react";
import { Box, Button } from "@mui/material";
import CardWrapperSimle from "../CardWrapperSimple/CardWrapperSimple";

import { useTheme, useMediaQuery } from '@mui/material';

const CardsList = ({itemsCount, data, showAllItems = false}) => {
    const [showItems, setShowAllItems] = useState(showAllItems);
    const theme = useTheme(); 
    
    const matches1920 = useMediaQuery(theme.breakpoints.down('xxl'));
    const matches1536 = useMediaQuery(theme.breakpoints.down('xl'));
    const matches1200 = useMediaQuery(theme.breakpoints.down('lg'));
    const matches900 = useMediaQuery(theme.breakpoints.down('md'));
    const matches800 = useMediaQuery(theme.breakpoints.down('msm'));
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    const matches400 = useMediaQuery(theme.breakpoints.down('ssm'));
    
    if (matches600) {
      itemsCount = 2;
    } else if (matches800) {
      itemsCount = 3;
    } else if (matches900) {
      itemsCount = 4;
    } else if (matches1200) {
      itemsCount = 5;
    } else if (matches1536) {
      itemsCount = 6;
    } else if (matches1920) {
      itemsCount = 7;
    }
    const visibleItems = showItems ? data : data.slice(0, itemsCount)

    const itemValue = (100 - 4) / itemsCount;
    const itemWidth = `${itemValue}%`;
    const gapItemsPreValue = `calc(4% / ${itemsCount})`;
    const gapItemsValue = `calc((4% + ${gapItemsPreValue}) / ${itemsCount})`;

    return (
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", rowGap: "10px", width: "100%", marginBottom: showAllItems ? "0px" : "20px" }}>
          {visibleItems.map((item, index) => (
            <Box key={index} sx={{ flex: `0 0 ${itemWidth}`, boxSizing: "border-box", marginRight: index % itemsCount === itemsCount - 1 ? "0px" : gapItemsValue }}>
                <CardWrapperSimle product={item} />
            </Box>
          ))}
          {!showAllItems && data.length > itemsCount && (
            <Button
              variant="outlined"
              color="info"
              sx={{ position: "absolute", width: matches600 ? "100%" : undefined, bottom: "-15px", right: "0px" }}
              onClick={() => setShowAllItems(true)}
              size="small"
            >
              Показати всі продукти
            </Button>
          )}
        </Box>
      );
};

export default CardsList