import React from "react";
import { Box, Typography, Divider, Link } from "@mui/material";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useTheme } from '@mui/material';

const BlockInfoSimple = ({blockTitle, data, useAccordion = false, bgcolorForAccordion = "#fff"}) => {
    const theme = useTheme();

    const content = (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            {data.map((item, index) => (
                <Link href={item.href} underline="hover" rel="noreferrer" key={index} sx={{ paddingTop: index === 0 ? "0px" : "5px", paddingBottom: index === data.length - 1 ? "0px" : "5px", fontSize: 16, color: theme.palette.text.main, "&:hover": {color: "#656464"}}} >
                    {item.text}
                </Link>
            ))}
        </Box>
    );

    return useAccordion ? (
        <Accordion sx={{bgcolor: {bgcolorForAccordion}}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ mr: -1 }} />}
                aria-controls="panel1-content"
                id="panel1-header" 
                sx={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingX: "20px"}}
            >
                <Typography sx={{ textAlign: "left", fontFamily: "Arial", fontSize: "16px", color: theme.palette.text.main, fontWeight: 600 }}>
                    {blockTitle}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {content}
            </AccordionDetails>

        </Accordion>
    ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px"}}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", gap: "15px", paddingX: "20px"}}>
                <Typography sx={{ textAlign: "left", fontFamily: "Arial", fontSize: "16px", color: theme.palette.text.main, fontWeight: 600 }}>
                    {blockTitle}
                </Typography>
                {content}
            </Box>
            <Divider sx={{width: "100%", marginTop: "10px"}} />
        </Box>
    );
};

export default BlockInfoSimple;