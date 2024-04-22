import { Box, Link, Typography } from "@mui/material";
import React from "react";

import CardsList from "../CardsList/CardsList";
import PlayVideoIcon from '@mui/icons-material/PlayCircleFilled';
import CardsListVideo from "../CardListVideo/CardListVideo";


const ContentBlockVideo = ({itemsCount, sectionTitle, chanelTitle, sectionLink, data }) => {
    
    return (
        <Box sx={{margin: "30px 0",display: "flex", flexDirection: "column", gap: "20px"}}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="h5" color="text.secondary" sx={{display: "flex", gap: "10px"}}>
                    {sectionTitle}
                    <Link href={sectionLink} target="_blank" underline="hover" color="inherit" sx={{color: "#3e77aa"}}>
                        {chanelTitle}
                    </Link>
                </Typography>

                <Link href={sectionLink} target="_blank" underline="hover" color="inherit" sx={{color: "#fff"}}>
                    <Box sx={{display: "flex", gap: "5px", bgcolor: "red", padding: "3px", color: "#fff", borderRadius: "5px"}}>
                        <PlayVideoIcon sx={{color: "#fff"}} />
                        <Typography sx={{paddingRight: "5px"}}>
                            {"YouTube"}
                        </Typography>
                    </Box>
                </Link>
            </Box>

            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", rowGap: "15px", padding: "20px", flexWrap: "wrap", position: "relative",  bgcolor: "primary.main"}}>
                <CardsListVideo itemsCount={itemsCount} data={data} />
            </Box>

        </Box>
    );
};

export default ContentBlockVideo