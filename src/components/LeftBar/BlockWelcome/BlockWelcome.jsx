import React, {useState} from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import AuthPopup from "../../Popups/AuthPopup/AuthPopup";

const BlockWelcome = () => {
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

    const handleAuthPopupClose = () => {
        setIsAuthPopupOpen(false);
    };

    const handleAuthPopupOpen = () => {
        setIsAuthPopupOpen(true);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Typography sx={{ textAlign: 'center', fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold' }}>
                Welcome!
            </Typography>
            <Typography sx={{ textAlign: 'center', fontFamily: 'Arial', fontSize: '16px' }}>
                Log in to receive recommendations, personal bonuses and discounts.
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                sx={{fontSize: "10px",  backgroundColor: '#00B0FF', '&:hover': { backgroundColor: '#0081CB' } }}
                onClick={handleAuthPopupOpen}                
                >
                Enter your personal account
            </Button>

            <Divider sx={{width: '100%', marginTop: "20px"}} />

            <AuthPopup open={isAuthPopupOpen} setOpen={handleAuthPopupClose} />
        </Box>
    );
};

export default BlockWelcome;