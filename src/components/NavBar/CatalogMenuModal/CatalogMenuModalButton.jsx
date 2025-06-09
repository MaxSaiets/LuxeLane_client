import React, { useState } from "react";
import { Button, Box } from '@mui/material';
import CatalogMenuModal from './CatalogMenuModal';
import { useTheme, useMediaQuery } from "@mui/material";

const CatalogMenuModalButton = () => {
    const theme = useTheme();
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    const matches400 = useMediaQuery(theme.breakpoints.down('400'));

    const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);
    const handleOpen = () => setCategoriesModalOpen(true);
    const handleClose = () => setCategoriesModalOpen(false);

    return (
        <Box sx={{ padding: matches600 ? "0px" : "15px" }}>
            <Button 
                onClick={categoriesModalOpen ? handleClose : handleOpen} 
                variant="contained" 
                sx={{ padding: matches400 ? "6px 10px" : undefined, color: "text.black" }}
            >
                Catalog
            </Button>

            <CatalogMenuModal open={categoriesModalOpen} onClose={handleClose} />
        </Box>
    );
};

export default CatalogMenuModalButton;