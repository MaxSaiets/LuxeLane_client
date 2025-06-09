import React from "react";
import { Link, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from '@mui/material';

const ContentBlockTitleSimple = ({ sectionTitle, sectionLink, spesialTitle }) => {
    const theme = useTheme();
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Typography 
            variant={matches600 ? "h6" : "h5"} 
            color="text.mainPageBlocksTitles" 
            sx={{ display: "flex", gap: matches600 ? "5px" : "10px", fontWeight: "500", color: theme.palette.text.mainPageBlocksTitles, marginBottom: "10px" }}
        >
            {sectionTitle}
            
            {spesialTitle && sectionLink && (
                <Link href={sectionLink} target="_blank" underline="hover" sx={{ color: "#3e77aa" }}>
                    {spesialTitle}
                </Link>
            )}
        </Typography>
    );
};

export default ContentBlockTitleSimple;
