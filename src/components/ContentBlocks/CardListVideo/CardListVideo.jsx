import React, {useState} from "react";
import { Box, Button } from "@mui/material";
import CardWrapperVideo from "../CardWrapperVideo/CardWrapperVideo";

import { useTheme, useMediaQuery } from '@mui/material';

const CardsListVideo = ({itemsCount, data}) => {
    const [showAllItems, setShowAllItems] = useState(false);
    const theme = useTheme();
    
    const matches1920 = useMediaQuery(theme.breakpoints.down('xxl'));
    const matches1536 = useMediaQuery(theme.breakpoints.down('xl'));
    const matches1200 = useMediaQuery(theme.breakpoints.down('lg'));
    const matches900 = useMediaQuery(theme.breakpoints.down('md'));
    const matches800 = useMediaQuery(theme.breakpoints.down('msm'));
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    
    if (matches600) {
        itemsCount = 2;
    } else if (matches800) {
        itemsCount = 3;
    } else if (matches900) {
        itemsCount = 4;
    } else if (matches1200) {
        itemsCount = 3;
    } else if (matches1536) {
        itemsCount = 6;
    } else if (matches1920) {
        itemsCount = 7;
    }

    
    const visibleItems = showAllItems ? data : data.slice(0, itemsCount)
    
    const itemValue = (100 - 3) / itemsCount;
    const gapItemsValue = `calc(3% / ${itemsCount})`;

    const marginValue = matches900 ? "10px" : "15px";
    const margin = matches900 ? `${marginValue} calc(${marginValue} - ${gapItemsValue}) ${marginValue} ${marginValue}` : `${marginValue} calc(${marginValue} - ${gapItemsValue}) ${marginValue} ${marginValue}`;

    const itemWidth = `${itemValue}%`;

    return (
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", columnGap: gapItemsValue, rowGap: matches900 ? "10px" : "15px", width: "100%", margin: margin}}>

            {visibleItems.map((item, index) => (
                <Box key={index} sx={{ flex: `0 0 ${itemWidth}`, boxSizing: "border-box", display: "flex"}}>
                    <CardWrapperVideo item={item} />
                </Box>
             ))}
            {!showAllItems && data.length > itemsCount && (
                <Button
                    variant="outlined"
                    color="info"
                    sx={{ flexWrap: "nowrap", position: "absolute", width: matches600 ? "100%" : undefined, bottom: "-30px", right: matches600 ? "0px" : marginValue }}
                    onClick={() => setShowAllItems(true)}
                    size="small"
                >
                    Show more videos
                </Button>
            )}
        </Box>
    );
};

export default CardsListVideo