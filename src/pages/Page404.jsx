import React from "react";

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MAIN_ROUTE } from "../utils/consts";

import { Box, Typography } from '@mui/material';

const Page404 = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
            flexDirection="column"
            gap="20px"
        >
            <Typography variant="h1" sx={{color: "red"}}>Помилка 404</Typography>
            <Typography variant="h3">Сторінку не знайдено</Typography>
            <Typography variant="h5">Неправильно набрано адресу або такої сторінки на сайті більше не існує.</Typography>

            <MuiLink component={RouterLink} underline='hover' color="#FFF" to={MAIN_ROUTE} 
                sx={{ 
                    bgcolor: "#000000",
                    color: "#FFF",
                    padding: "10px 20px",
                    borderRadius: "5px",

                }}
            >
                Перейти на головну сторінку
            </MuiLink>
        </Box>
    );
};

export default Page404;