import React, { useState, useEffect, useContext} from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';

import { RootStoreContext } from "../../../store/RootStoreProvider";

import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "../../../utils/consts";

import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { ReactComponent as GoToBuyMoreProductsSvg } from "../buy-cart-discount-svgrepo-com.svg";

import ContentBlockForBasket from "../ContentBlockForBasket/ContentBlockForBasket";    

import ContentBlockSlider from "../../ContentBlocks/ContentBlockSlider/ContentBlockSlider";
import { fetchProductsForAdsBlock } from "../../../http/blockAdsApi";

const ProductsListForBasket = observer(() => {
    const navigate = useNavigate();

    const { basketStore, userStore} = useContext(RootStoreContext);
    const [dataForBlockSlider, setDataForBlockSlider] = useState([]);

    useEffect(() => {
        fetchProductsForAdsBlock({itemsCount: 10}).then(data => setDataForBlockSlider(data));
    }, [userStore.isAuth, userStore.user.id]);

    const handleSelectMoreProducts = () => {
        navigate(MAIN_ROUTE);
    };

    return (
        <Box>
            <Grid container>
                {basketStore.basketCount > 0 ? (
                    <ContentBlockForBasket />
                ) : (
                    <Box sx={{width: "100%", textAlign: "center"}}>
                        <Box sx={{paddingBottom: "20px", borderBottom: "1px solid rgba(0, 0, 0, 0.4)"}}>
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                The basket is empty
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
                        sectionTitle={"Pеклама"} 
                        data={dataForBlockSlider}  
                    />  
                </Box>
                
            </Grid>    
        </Box>
    );
});

export default ProductsListForBasket;