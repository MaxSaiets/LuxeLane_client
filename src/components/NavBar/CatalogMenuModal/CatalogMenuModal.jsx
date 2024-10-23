import React, { useState, useEffect } from "react";
import { Box, Divider, Typography, IconButton, Grid, Modal, Button } from '@mui/material';
import CatalogList from "../../CatalogList/CatalogList";
import SubCatalogList from "../../CatalogList/SubCatalogList/SubCatalogList";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, useMediaQuery } from "@mui/material";

const CatalogMenuModal = ({ open, onClose }) => {
    const theme = useTheme();
    const matches900 = useMediaQuery(theme.breakpoints.down("md"));

    const [supModalOpen, setSupModalOpen] = useState(false);
    const [selectedCategoryForSubCategories, setSelectedCategoryForSubCategories] = useState();
    const [title, setTitle] = useState("CATALOG");

    const handleCategoryClick = (category) => {
        setSupModalOpen(true);
        setSelectedCategoryForSubCategories(category);
        setTitle(category);
    };

    const handleBackToCategories = () => {
        setSelectedCategoryForSubCategories(null);
        setSupModalOpen(false);
    };

    const closeAllModals = () => {
        onClose();
        setSupModalOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal_catalog"
            aria-describedby="modal-catalog"
            sx={{
                '& .MuiBackdrop-root': {
                    backdropFilter: 'blur(2px)',
                },
            }}
        >
            <Box sx={{
                position: 'absolute',
                top: matches900 ? '0px' : '64px',
                padding: '0px 16px',
                paddingBottom: "10px",
                left: '50%',
                transform: 'translate(-50%)',
                width: "100%",
                height: "auto",
                bgcolor: 'primary.main',
                boxShadow: 24,
                zIndex: 9999,
            }}>
                <Grid container direction={matches900 ? "column" : "row"}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "8px 0px" }}>
                        <Typography variant="h6" sx={{ textAlign: "left" }}>CATALOG</Typography>                        
                        <IconButton onClick={closeAllModals} sx={{ color: "text.primary" }}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Divider sx={{ width: "calc(100% + 32px)", marginLeft: "-16px" }} />
                    <Grid item xs={12} sm={matches900 ? 12 : 3} sx={{ paddingTop: "10px" }}>
                        <CatalogList categoriesModalOpen={open} closeModal={closeAllModals} setSelectedCategoryForSubCategories={handleCategoryClick} isInMenu={true} />
                    </Grid>

                    {matches900 ? (
                        <Modal
                            open={supModalOpen}
                            onClose={() => setSupModalOpen(false)}
                            aria-labelledby="modal_supCatalog"
                            aria-describedby="modal_supCatalog"
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: matches900 ? '0px' : '64px',
                                padding: '0px 16px',
                                paddingBottom: "10px",
                                left: '50%',
                                transform: 'translate(-50%)',
                                width: "100%",
                                height: "auto",
                                bgcolor: 'primary.main',
                                boxShadow: 24,
                                zIndex: 9999,
                            }}>
                                <Grid item xs={12}>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "8px 0px" }}>
                                        <Typography variant="h6" sx={{ textAlign: "left" }}>{title}</Typography>
                                        <IconButton onClick={closeAllModals} sx={{ color: "text.primary" }}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>

                                    <Divider sx={{ width: "calc(100% + 32px)", marginLeft: "-16px" }} />
                                    <Button
                                        onClick={handleBackToCategories}
                                        variant="text"
                                        sx={{
                                            margin: "10px 0px",
                                            textTransform: "none",
                                            color: "#000000",
                                            padding: 0,
                                            minWidth: "auto",
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <ArrowBackIcon sx={{ marginRight: "5px", fontSize: "20px", color: theme.palette.text.catalogList }} />
                                        <Typography variant="body1" sx={{ textAlign: "left", color: theme.palette.text.catalogList }}>Повернутися до вибору категорії</Typography>
                                    </Button>
                                    <SubCatalogList category={selectedCategoryForSubCategories} closeModal={closeAllModals} />
                                </Grid>
                            </Box>
                        </Modal>
                    ) : (
                        <Grid item xs={12} sm={9} sx={{ padding: "10px" }}>
                            <SubCatalogList category={selectedCategoryForSubCategories} closeModal={closeAllModals} />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Modal>
    );
};

export default CatalogMenuModal;