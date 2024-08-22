import { Box, Link, Typography } from "@mui/material";
import React from "react";


import ContentBlockTitleSimple from "../ContentBlockTitleSimple/ContentBlockTitleSimple";

import PlayVideoIcon from '@mui/icons-material/PlayCircleFilled';
import CardsListVideo from "../CardListVideo/CardListVideo";

import { useMediaQuery, useTheme } from '@mui/material';

const ContentBlockVideo = ({itemsCount, sectionTitle, chanelTitle, sectionLink, data }) => {
    const theme = useTheme();
    
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    const matches400 = useMediaQuery(theme.breakpoints.down('ssm'));

    return (
        <Box sx={{ margin: "30px 0px 45px 0px", display: "flex", flexDirection: "column", gap: matches600 ? "10px" : "20px"}}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <ContentBlockTitleSimple sectionTitle={sectionTitle} sectionLink={sectionLink} spesialTitle={chanelTitle}  />
 
                {!matches400 && 
                    <Link href={sectionLink} target="_blank" underline="hover" color="inherit" sx={{color: "#fff"}}>
                        <Box sx={{display: "flex", gap: "5px", bgcolor: "red", padding: "3px", color: "#fff", borderRadius: "5px"}}>
                            <PlayVideoIcon sx={{color: "#fff"}} />
                            <Typography sx={{paddingRight: "5px"}}>
                                {"YouTube"}
                            </Typography>
                        </Box>
                    </Link>
                } 
            </Box>

            <Box sx={{ width: "100%", display: "flex", position: "relative", bgcolor: "primary.main", borderRadius: "8px",}}>
                <CardsListVideo itemsCount={itemsCount} data={data} />
            </Box>

        </Box>
    );
};

export default ContentBlockVideo