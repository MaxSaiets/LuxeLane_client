import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';

import { useContext } from "react";
import { RootStoreContext } from "../../../store/RootStoreProvider";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "../../../utils/consts";

import ContentBlockSliderForFavorites from "../../ContentBlocks/ContentBlockSliderForFavorites/ContentBlockSliderForFavorites";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

import { ReactComponent as GoToBuyMoreProductsSvg } from "../buy-cart-discount-svgrepo-com.svg";

import ContentBlockSlider from "../../ContentBlocks/ContentBlockSlider/ContentBlockSlider";
import { fetchProductsForAdsBlock } from "../../../http/blockAdsApi";

const ProductsListForUserFavorites = observer(() => {
    const navigate = useNavigate();
 
    const { favoritesStore, userStore } = useContext(RootStoreContext);
    const [dataForBlockSlider, setDataForBlockSlider] = useState([]);

    const handleSelectMoreProducts = () => {
        navigate(MAIN_ROUTE);
    };

    useEffect(() => {
        fetchProductsForAdsBlock({itemsCount: 10}).then(data => setDataForBlockSlider(data));
    }, [userStore.isAuth, userStore.user.id]);

    return (
        <Box>
            <Grid container>

                {favoritesStore.hasUserFavoritesList ? (
                    <ContentBlockSliderForFavorites
                        sectionTitle={"Favorites"}
                        data={favoritesStore.userFavoriteList}
                        showAllItems={true}
                    />  
                ) : (
                    <Box sx={{width: "100%", textAlign: "center"}}>
                        <Box sx={{paddingBottom: "20px", borderBottom: "1px solid rgba(0, 0, 0, 0.4)"}}>
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                You do not have any favorite products
                            </Typography>
                        
                            <Box
                                sx={{cursor: "pointer"}}
                                onClick={handleSelectMoreProducts}
                            >
                                <GoToBuyMoreProductsSvg width={300} height={300} />
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 2 }}
                                startIcon={<LocalGroceryStoreIcon />}
                                onClick={handleSelectMoreProducts}
                            >
                                Select more products
                            </Button>
                        </Box>
                    </Box>
                )}

                <Box sx={{width: "100%"}}>
                    <ContentBlockSlider 
                        sectionTitle={"More products"} 
                        data={dataForBlockSlider}  
                    />  
                </Box>

            </Grid>    
        </Box>
    );
});

export default ProductsListForUserFavorites;