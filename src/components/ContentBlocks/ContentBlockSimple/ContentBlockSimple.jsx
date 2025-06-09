import { Box, Typography } from "@mui/material";
import React from "react";

import CardsList from "../CardsList/CardsList";
import ContentBlockTitleSimple from "../ContentBlockTitleSimple/ContentBlockTitleSimple";

import { useTheme, useMediaQuery } from '@mui/material';

const ContentBlockSimple = ({itemsCount, sectionTitle, data, style, navigateTo, showNavigateBtn, showAllItems = false}) => {
    const theme = useTheme();
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ width: "100%", margin: matches600 ? "15px 0" : "30px 0", display: "flex", flexDirection: "column", gap: matches600 ? "10px" : "20px", height: "auto", ...style}}>

            <ContentBlockTitleSimple sectionTitle={sectionTitle} />

            <Box sx={{width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", position: "relative"}}>
                <CardsList itemsCount={itemsCount} data={data} showAllItems={showAllItems} navigateTo={navigateTo} showNavigateBtn={showNavigateBtn} />
            </Box>
        </Box>
    );
};

export default ContentBlockSimple