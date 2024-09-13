import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Grid } from '@mui/material';
import { fetchProductData } from "../../http/productApi";

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';

import { RootStoreContext } from "../../store/RootStoreProvider";
import { useTheme, useMediaQuery } from '@mui/material';

import AuthPopup from '../Popups/AuthPopup/AuthPopup';
import {observer} from "mobx-react-lite";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

import ProductPageCorousel from "./ProductPageCarousel/ProductPageCarousel";
import ImageModal from "./modal/FullCarouselImgsModal";

const ProductPageContent = observer(() => {
    const { userStore, recentryViewedStore, favoritesStore, basketStore } = useContext(RootStoreContext);

    const theme = useTheme(); 
    const matches400 = useMediaQuery(theme.breakpoints.down('ssm'));
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    const matches900 = useMediaQuery(theme.breakpoints.down('md'));

    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);
    
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
    const handleAuthPopupClose = () => {
        setIsAuthPopupOpen(false);
    };

    const [isModalFullImgsOpen, setIsModalFullImgsOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const openModalFullImgs = (index) => {
        console.log("Open modal with index:", index);
        setSelectedImageIndex(index);
        setIsModalFullImgsOpen(true);
    };
    
    const closeModalFullImgs = () => {
        setIsModalFullImgsOpen(false);
    };
    
    useEffect(() => {
        const loadProductData = async () => {
            setIsLoadingProduct(true);
            try {
                if (userStore.isAuth) {
                    const data = await fetchProductData(id, userStore.user.id);
                    // console.log("Product data:", data);

                    setProductData(data);
                }
            } catch (error) {
                console.error("Error loading product data:", error);
            } finally {
                setIsLoadingProduct(false);
            }
        };

        loadProductData();
    }, [id, userStore.isAuth, userStore.user.id]);
    
    if (!productData || isLoadingProduct) {
        return <LoadingScreen text={"Loading product data..."} />;
    }

    const handleBasketClick = () => {
        if (userStore.isAuth) {
            let updatedProductData = { ...productData };

            if (productData.isInBasket) {
                basketStore.removeProduct(productData.id);
                updatedProductData.isInBasket = false;
            } else {
                basketStore.addProduct(productData.id);
                updatedProductData.isInBasket = true;
            }

            setProductData(updatedProductData);
        } else {
            setIsAuthPopupOpen(true);
        }
    };

    const handleFavoriteClick = async () => {
        if (userStore.isAuth) {
            let updatedProductData = { ...productData };
            
            if (productData.isFavorite) {
                await favoritesStore.removeFavoriteProduct(productData.id);
                updatedProductData.isFavorite = false;
            } else {
                await favoritesStore.addFavoriteProduct(productData.id);
                updatedProductData.isFavorite = true;
            }
            
            setProductData(updatedProductData);
        } else {
            setIsAuthPopupOpen(true);
        }
    };

    const ProductTitleWithButtons = () => {
        return (
            <Box>
                <Typography variant="h5" component="div" gutterBottom>
                    {productData.title}
                </Typography>
                <Typography variant="h6" component="div" gutterBottom>
                    Ціна: {productData.price} грн
                </Typography>
    
                <Box sx={{ display: "flex", width: "100%", flexDirection: matches400 ? "column" : "row", gap: "15px" }}>
                    <Button
                        variant="contained"
                        color={productData.isInBasket ? "secondary" : "success"}
                        onClick={handleBasketClick}
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        {productData.isInBasket ? "Видалити з кошика" : "Додати до кошика"}
                    </Button>
    
                    <Button
                        variant="contained"
                        color={productData.isFavorite ? "secondary" : "success"}
                        onClick={handleFavoriteClick}
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        {productData.isFavorite ? "Видалити з улюблених" : "Додати до улюблених"}
                    </Button>
                </Box>
            </Box>
        );
    };

    return (
        <Grid container sx={{paddingBottom: matches600 ? "56px" : "20px"}}>
            {/* Product navbar */}
            <Grid item xs={12} sx={{
                position: "sticky",
                top: matches600 ? "56px" : "64px",
                zIndex: "1000",
                borderBottom: "1px solid black",
                backdropFilter: "saturate(180%) blur(20px)",
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.7),
            }}>
                <Box sx={{
                    boxSizing: "border-box",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    display: "flex",
                    flexDirection: "row",
                    gap: "15px",
                    alignItems: "center",
                    margin: matches600 ? "5px 8px" : "5px 16px",
                    "msOverflowStyle": "none",
                    "scrollbarWidth": "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    }
                }}>
                    <MuiLink component={RouterLink} underline='none' color="#000000" to={"#product-description"}>
                        <Typography variant="body1" sx={{fontWeight: "500"}} component="div">
                            Усе про товар
                        </Typography>
                    </MuiLink>
                    <MuiLink component={RouterLink} underline='none' color="#000000" to={"/"}>
                        <Typography variant="body1" sx={{fontWeight: "500"}} component="div">
                            Характеристики
                        </Typography>
                    </MuiLink>
                    <MuiLink component={RouterLink} underline='none' color="#000000" to={"/"}>
                        <Typography variant="body1" sx={{fontWeight: "500"}} component="div">
                            Відгуки
                        </Typography>
                    </MuiLink>
                    <MuiLink component={RouterLink} underline='none' color="#000000" to={"/"}>
                        <Typography variant="body1" sx={{fontWeight: "500"}} component="div">
                            Питання
                        </Typography>
                    </MuiLink>
                </Box>
            </Grid>

            <Grid container sx={{ maxWidth: "1570px", margin: "5px auto"}}>
 
                {/* Product images carousel */}
                <Grid 
                    item xs={12} md={6} 
                    sx={{
                        padding: matches900 ? "8px" : "24px 15px 0 24px", 
                        zIndex: "500"
                    }}
                >   
                    <Box sx={{ position: "sticky", top: "128px" }}>
                        
                        <ProductPageCorousel data={productData.images} openModalFullImgs={openModalFullImgs} />
    
                        {/* BOX UNDER PICTURES */}
                        <Box>
                            {matches900 
                                ? 
                                    <ProductTitleWithButtons />
                                :
                                    null
                            }
                            <Box sx={{margin: "10px 0px 5px 0px"}}>
                                <Typography variant="body2" component="div" gutterBottom>
                                    <span style={{fontWeight: 500}}>For main characteristics</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor consectetur aliquet. Proin blandit, quam in bibendum luctus, nisl leo ultrices justo, id consectetur lectus ligula vitae metus. Fusce ut sapien hendrerit, scelerisque nisi vel, auctor urna. Nullam congue, purus semper dignissim rutrum, justo tortor semper ligula, ac gravida sapien est sed nisl.
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                </Grid>

                {/* Product main info */}
                <Grid item xs={12} md={6} sx={{ 
                    padding: matches900 ? "8px" :  "24px 24px 0 15px", 
                    position: "relative",
                }}>
                    {matches900 
                        ? null
                        : <ProductTitleWithButtons />
                    }

                    <Box sx={{ marginTop: matches900 ? "0px" : "16px" }}>
                        <Typography variant="h5" component="div" gutterBottom>
                            Характеристики
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                        
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor consectetur aliquet. Proin blandit, quam in bibendum luctus, nisl leo ultrices justo, id consectetur lectus ligula vitae metus. Fusce ut sapien hendrerit, scelerisque nisi vel, auctor urna. Nullam congue, purus semper dignissim rutrum, justo tortor semper ligula, ac gravida sapien est sed nisl. Donec pretium magna id arcu interdum, nec sodales mi ornare. Phasellus congue, augue eu tempor tempus, orci erat porta magna, vitae aliquam velit enim bibendum augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vitae sapien placerat, porta arcu quis, venenatis dolor. Praesent velit lorem, interdum quis dolor vel, pretium ornare leo. In aliquet turpis dui, in mollis odio laoreet vel. Nullam at eros lacinia, ullamcorper velit eu, efficitur lorem. Vivamus sodales augue odio, sodales bibendum quam convallis quis. Praesent et velit nulla. Pellentesque dapibus sem neque, ac facilisis neque tempus non.
                            <br />
                            Donec interdum molestie vehicula. Integer cursus sollicitudin tempus. Etiam vitae accumsan nisi. Etiam nec blandit turpis. Nullam cursus tempus nibh. Ut mollis est eget mauris tristique, sit amet pharetra ligula consectetur. Cras aliquam elementum purus, eget finibus leo accumsan vitae. Donec molestie neque iaculis malesuada elementum. Sed varius fermentum eleifend. Mauris pharetra mauris vel purus ultrices, id congue ipsum efficitur. Sed varius orci eget lacus rutrum vehicula.
                            <br />
                            Quisque eu faucibus dui. Morbi bibendum feugiat ultricies. In egestas facilisis augue, quis ornare felis interdum sit amet. Cras non ultrices felis. Pellentesque a volutpat diam. Praesent rutrum diam porttitor justo efficitur, non pulvinar libero sodales. Curabitur vulputate, nibh eget malesuada tempus, diam quam vulputate leo, vel cursus erat mauris at erat. Etiam elementum nisl sed dolor dignissim, in pretium felis porttitor.
                         
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                        
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor consectetur aliquet. Proin blandit, quam in bibendum luctus, nisl leo ultrices justo, id consectetur lectus ligula vitae metus. Fusce ut sapien hendrerit, scelerisque nisi vel, auctor urna. Nullam congue, purus semper dignissim rutrum, justo tortor semper ligula, ac gravida sapien est sed nisl. Donec pretium magna id arcu interdum, nec sodales mi ornare. Phasellus congue, augue eu tempor tempus, orci erat porta magna, vitae aliquam velit enim bibendum augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vitae sapien placerat, porta arcu quis, venenatis dolor. Praesent velit lorem, interdum quis dolor vel, pretium ornare leo. In aliquet turpis dui, in mollis odio laoreet vel. Nullam at eros lacinia, ullamcorper velit eu, efficitur lorem. Vivamus sodales augue odio, sodales bibendum quam convallis quis. Praesent et velit nulla. Pellentesque dapibus sem neque, ac facilisis neque tempus non.
                            <br />
                            Donec interdum molestie vehicula. Integer cursus sollicitudin tempus. Etiam vitae accumsan nisi. Etiam nec blandit turpis. Nullam cursus tempus nibh. Ut mollis est eget mauris tristique, sit amet pharetra ligula consectetur. Cras aliquam elementum purus, eget finibus leo accumsan vitae. Donec molestie neque iaculis malesuada elementum. Sed varius fermentum eleifend. Mauris pharetra mauris vel purus ultrices, id congue ipsum efficitur. Sed varius orci eget lacus rutrum vehicula.
                            <br />
                            Quisque eu faucibus dui. Morbi bibendum feugiat ultricies. In egestas facilisis augue, quis ornare felis interdum sit amet. Cras non ultrices felis. Pellentesque a volutpat diam. Praesent rutrum diam porttitor justo efficitur, non pulvinar libero sodales. Curabitur vulputate, nibh eget malesuada tempus, diam quam vulputate leo, vel cursus erat mauris at erat. Etiam elementum nisl sed dolor dignissim, in pretium felis porttitor.
                        
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <AuthPopup open={isAuthPopupOpen} setOpen={handleAuthPopupClose} /> 


            <ImageModal
                isOpen={isModalFullImgsOpen}
                onClose={closeModalFullImgs}
                images={productData.images}
                title={productData.title}
                selectedImageIndex={selectedImageIndex}
                onImageChange={setSelectedImageIndex}
            />
        </Grid>
    );
});

export default ProductPageContent;
