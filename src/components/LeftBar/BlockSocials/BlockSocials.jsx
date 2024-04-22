import React from "react";
import { Box, Typography, Divider, Link } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { AiFillYoutube, AiFillInstagram } from 'react-icons/ai';
import { FaTelegramPlane, FaViber } from 'react-icons/fa';

const BlockSocials = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px"}}>
            <Typography sx={{ textAlign: "center", fontFamily: "Arial", fontSize: "20px", fontWeight: "bold" }}>
                Our socials
            </Typography>
            
            <Box sx={{display: "flex", flexDirection: "row", gap: "10px"}}>
                <Link href="#" target="_blank" rel="noreferrer">
                    <Box sx={{ color: "#343434", '&:hover': { color: 'grey' }}}>
                        <FacebookIcon style={{ fontSize: '24px'}} />
                    </Box>
                </Link>
                <Link href="#" target="_blank" rel="noreferrer">
                    <Box sx={{ color: "#343434", '&:hover': { color: 'grey' }}}>
                        <TwitterIcon style={{ fontSize: '24px'}} />
                    </Box>
                </Link>
                <Link href="#" target="_blank" rel="noreferrer">
                    <Box sx={{ color: "#343434", '&:hover': { color: 'grey' }}}>
                        <AiFillYoutube style={{ fontSize: '24px'}} />
                    </Box>
                </Link>
                <Link href="#" target="_blank" rel="noreferrer">
                    <Box sx={{ color: "#343434", '&:hover': { color: 'grey' }}}>
                        <AiFillInstagram style={{ fontSize: '24px'}} />
                    </Box>
                </Link>
                <Link href="#" target="_blank" rel="noreferrer">
                    <Box sx={{ color: "#343434", '&:hover': { color: 'grey' }}}>
                        <FaTelegramPlane style={{ fontSize: '24px'}} />
                    </Box>
                </Link>
            </Box>

            <Divider sx={{width: "100%", marginTop: "10px"}} />
        </Box>
    );
};

export default BlockSocials;