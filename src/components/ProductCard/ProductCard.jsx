import React, {useEffect, useState} from 'react';
import { Box, Card, CardContent, Chip, Grid, IconButton, Typography } from '@mui/material';
import LazyLoad from 'react-lazyload';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { PRODUCT_ROUTE } from '../../utils/consts';

import { useTheme } from '@mui/material/styles';

import { useContext } from 'react';
import { RootStoreContext } from "../../store/RootStoreProvider";

import AuthPopup from '../Popups/AuthPopup/AuthPopup';

const ProductCard = ({ product, onAddToBasket, onRemoveFromBasket, onAddToFavorites, onRemoveFromFavorites }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [isInBasket, setIsInBasket] = useState(product.isInBasket);
    const [isFavorite, setIsFavorite] = useState(product.isFavorite);

    const theme = useTheme();

    const {userStore} = useContext(RootStoreContext);

    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

    const discountPercentage = product.discount ? ((1 - product.discount / product.price) * 100).toFixed(0) : null;
    
    useEffect(() => {
        setIsInBasket(product.isInBasket);
        setIsFavorite(product.isFavorite);
    }, [product.isFavorite, product.isInBasket]);
    
    const handleAuthPopupClose = () => {
        setIsAuthPopupOpen(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        setImageIndex(1);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setImageIndex(0);
    };
    
    const handleBasketClick = () => {
        if(userStore.isAuth){
            if (isInBasket) {
                setIsInBasket(false);
                onRemoveFromBasket(userStore.user.id, product.id);
            } else {
                setIsInBasket(true);
                onAddToBasket(userStore.user.id, product.id, true);
            }
        } else {
            setIsAuthPopupOpen(true);
        }
        
    };
 
    const handleFavoriteClick = () => {
        if(userStore.isAuth){
            if (isFavorite) {
                setIsFavorite(false);
                onRemoveFromFavorites(userStore.user.id, product.id);
            } else {
                setIsFavorite(true);
                onAddToFavorites(userStore.user.id, product.id);
            }
        } else {
            setIsAuthPopupOpen(true);
        }
    };

    return(
        <Grid 
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={product.id}
            sx={{
                minHeight: "100%",
                borderRight: "1px solid gray",
                borderBottom: "1px solid gray",
                position: "relative",
            }}
        >
            <Card
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    position: isHovered ? "absolute" : "relative",
                    top: 0,
                    left: 0,
 
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                    transformOrigin: 'center top',
                    transition: "transform 0.3s ease-in-out",
                    boxShadow: isHovered ? "5px 5px 15px rgba(0,0,0,0.3)" : "none",
                    padding: "16px",
                    minHeight: "400px",
                    zIndex: isHovered ? 100 : 0,
                }}
            >
                <CardContent sx={{padding: 0}}>
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Box sx={{paddingTop: "5px"}}>
                            {discountPercentage && <Chip label={`-${discountPercentage}%`} variant="filled" color="error" size="small" sx={{fontSize: "12px", fontWeight: "700"}} />}
                        </Box>

                        <Box sx={{justifyContent: "flex-end", display: "flex", flexDirection: "column", gap: "10px"}}>
                            <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                                <FavoriteBorderIcon sx={{ color: isFavorite ? theme.palette.cartIcons.active : theme.palette.cartIcons.main}} />
                            </IconButton>
                        </Box>
                    </Box>
                </CardContent>

                <MuiLink component={RouterLink} underline='none' color="#000000" to={PRODUCT_ROUTE(product.id)}>
                    <LazyLoad once>
                        <img
                            height="194"
                            src={ product.images[imageIndex] ? product.images[imageIndex] : product.images[0] }
                            alt={product.title}
                            style={{objectFit: "contain", paddingTop: "10px", margin: "0 auto", display: "block", width: "100%"}}
                        />
                    </LazyLoad>
                </MuiLink>

                <Box sx={{paddingTop: "20px"}}>

                    <MuiLink component={RouterLink} underline='none' color="#000000" to={PRODUCT_ROUTE(product.id)}>
                        <Typography color="text.main" sx={{fontSize: "14px"}}>
                            {product.title}
                        </Typography>
                    </MuiLink>

                    <Typography color="text.secondary" sx={{fontSize: "14px", textDecoration: "line-through"}}>
                        {product?.discount && `${product.discount}₴`}
                    </Typography>

                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography color="text.secondary" sx={{fontSize: "24px", color: "red"}}>
                            {product.price}₴
                        </Typography>

                        <Box>
                            <IconButton aria-label="add to basket" onClick={handleBasketClick}>
                                <AddShoppingCartIcon sx={{ color: isInBasket ? theme.palette.cartIcons.active : theme.palette.cartIcons.main}} />
                            </IconButton>
                        </Box>
                    </Box>

                    {isHovered && (
                        <Typography variant="h6" color="text.secondary">
                            More information about the product...
                            <br />
                            Under development...
                        </Typography>
                    )}

                </Box>
            </Card>

            <AuthPopup open={isAuthPopupOpen} setOpen={handleAuthPopupClose} /> 
        </Grid>
    )
};

export default ProductCard;