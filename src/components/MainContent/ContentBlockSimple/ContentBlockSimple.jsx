import { Box, Typography } from "@mui/material";
import React from "react";

import CardsList from "../CardsList/CardsList";


const ContentBlockSimple = ({itemsCount, sectionTitle, data}) => {
    
    return (
        <Box sx={{margin: "30px 0",display: "flex", flexDirection: "column", gap: "20px"}}>
            <Typography variant="h5" color="text.secondary">
                {sectionTitle}
            </Typography>

            <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "15px", position: "relative"}}>
                <CardsList itemsCount={itemsCount} data={data} />
            </Box>
        </Box>
    );
};

export default ContentBlockSimple