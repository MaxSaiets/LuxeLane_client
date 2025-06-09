import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";

import CardsListForSlide from "../CardsListForSlide/CardsListForSlide";
import { observer } from "mobx-react-lite";

import ContentBlockTitleSimple from "../ContentBlockTitleSimple/ContentBlockTitleSimple";

import { useTheme, useMediaQuery } from '@mui/material';

const ContentBlockSlider = observer(({carouserSettings, sectionTitle, data}) => {
    const theme = useTheme();
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box sx={{margin: matches600 ? "15px 0" : "30px 0", display: "flex", flexDirection: "column", gap: matches600 ? "10px" : "20px", height: "auto"}}>
            <ContentBlockTitleSimple sectionTitle={sectionTitle} />

            <CardsListForSlide carouserSettings={carouserSettings} data={data} />
        </Box>
    );
});

export default ContentBlockSlider