import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CatalogList from "../../CatalogList/CatalogList";
import SubCatalogList from "../../CatalogList/SubCatalogList/SubCatalogList";
import { useTheme, useMediaQuery } from "@mui/material";

import { Grid } from '@mui/material';

const style = {
  position: 'absolute',
  top: '64px',
  left: '50%',
  transform: 'translate(-50%)',
  width: "100%",
  height: "auto",
  bgcolor: 'background.paper',
  boxShadow: 24,
  zIndex: 9999,
};

const CatalogMenuModal = () => {
    const theme = useTheme();
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    const matches400 = useMediaQuery(theme.breakpoints.down('400'));

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
        
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("leftBar"));

    const [selectedCategoryForSubCategories, setSelectedCategoryForSubCategories] = useState();
    
    return (

        <Box sx={{padding: matches600 ? "0px" : "15px"}}>
            <Button onClick={open ? handleClose : handleOpen} variant="contained" sx={{ padding: matches400 ? "6px 10px" : undefined, color: "text.black"}}>Catalog</Button>
 
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container sx={{bgcolor: "primary.main", padding: "5px"}} direction={isSmallScreen ? "column" : "row"}>
                        <Grid item xs={12} sm={isSmallScreen ? 12 : 3} sx={{padding: "5px"}}>
                            <CatalogList setSelectedCategoryForSubCategories={setSelectedCategoryForSubCategories} isInMenu={true} />
                        </Grid>

                        <Grid item xs={12} sm={isSmallScreen ? 12 : 9} sx={{padding: "5px"}}>
                            <SubCatalogList category={selectedCategoryForSubCategories} />
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
      );
};

export default CatalogMenuModal;