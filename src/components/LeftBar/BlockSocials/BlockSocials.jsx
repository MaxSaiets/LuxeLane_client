import React from "react";
import { Box, Typography, Divider, Link } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { AiFillYoutube, AiFillInstagram } from 'react-icons/ai';
import { FaTelegramPlane, FaViber } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

const socialIcons = [
    { href: "#", icon: <FacebookIcon style={{ fontSize: '24px' }} />, color: 'icons.leftBarSocials' },
    { href: "#", icon: <TwitterIcon style={{ fontSize: '24px' }} />, color: 'icons.leftBarSocials' },
    { href: "#", icon: <AiFillYoutube style={{ fontSize: '24px' }} />, color: 'icons.leftBarSocials' },
    { href: "#", icon: <AiFillInstagram style={{ fontSize: '24px' }} />, color: 'icons.leftBarSocials' },
    { href: "#", icon: <FaTelegramPlane style={{ fontSize: '24px' }} />, color: 'icons.leftBarSocials' },
];

const BlockSocials = () => {
    const theme = useTheme();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <Typography sx={{ textAlign: "center", fontFamily: "Arial", fontSize: "20px", fontWeight: "bold" }}>
                Our socials
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                {socialIcons.map((item, index) => (
                    <Link href={item.href} target="_blank" rel="noreferrer" key={index}>
                        <Box sx={{ color: theme.palette[item.color] || item.color, '&:hover': { color: 'grey' } }}>
                            {item.icon}
                        </Box>
                    </Link>
                ))}
            </Box>

            <Divider sx={{ width: "100%", marginTop: "10px" }} />
        </Box>
    );
};

export default BlockSocials;
