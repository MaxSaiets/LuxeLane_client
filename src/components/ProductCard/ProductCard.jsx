    import React, {useEffect, useState} from 'react';
    import { Box, Card, CardContent, Chip, Grid, IconButton, Typography, Tooltip } from '@mui/material';
    import LazyLoad from 'react-lazyload';
    import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
    import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

    import { Link as MuiLink } from '@mui/material';
    import { Link as RouterLink } from 'react-router-dom';

    import { PRODUCT_ROUTE } from '../../utils/consts';

    import { useTheme, useMediaQuery } from '@mui/material';

    import { useContext } from 'react';
    import { RootStoreContext } from "../../store/RootStoreProvider";

    import AuthPopup from '../Popups/AuthPopup/AuthPopup';

    const ProductCard = ({ product, onAddToBasket, onRemoveFromBasket, onAddToFavorites, onRemoveFromFavorites }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [imageIndex, setImageIndex] = useState(0);
        const [isInBasket, setIsInBasket] = useState(product.isInBasket);
        const [isFavorite, setIsFavorite] = useState(product.isFavorite);

        const theme = useTheme();
        const matches900 = useMediaQuery(theme.breakpoints.down('md'));

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
                    onRemoveFromBasket(product.id);
                } else {
                    setIsInBasket(true);
                    onAddToBasket(product.id, true);
                }
            } else {
                setIsAuthPopupOpen(true);
            }
            
        };
    
        const handleFavoriteClick = () => {
            if(userStore.isAuth){
                if (isFavorite) {
                    setIsFavorite(false);
                    onRemoveFromFavorites(product.id);
                } else {
                    setIsFavorite(true);
                    onAddToFavorites(product.id);
                }
            } else {
                setIsAuthPopupOpen(true);
            }
        };

        return(
            <Grid 
                item
                xs={6}
                sm={6}
                msm={4}
                md={4}
                lg={3}
                key={product.id}
                sx={{
                    borderRight: "1px solid gray",
                    borderBottom: "1px solid gray",
                    position: "relative",
                    minHeight: "342px",
                }}
            >   
                <Card
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                        height: !matches900 && isHovered ? "auto" : "100%",
                        position: !matches900 && isHovered ? "absolute" : "relative",
                        top: 0,
                        left: 0,
                        transform: !matches900 && isHovered ? "scale(1.05)" : "scale(1)",
                        transformOrigin: 'center top',
                        transition: "transform 0.3s ease-in-out",
                        boxShadow: !matches900 && isHovered ? "5px 5px 15px rgba(0,0,0,0.3)" : "none",
                        padding: "10px",
                        zIndex: !matches900 && isHovered ? 100 : 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <CardContent sx={{padding: 0}}>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <Box sx={{paddingTop: "5px"}}>
                                {discountPercentage && <Chip label={`-${discountPercentage}%`} variant="filled" color="error" size="small" sx={{fontSize: "12px", fontWeight: "700"}} />}
                            </Box>

                            <Box sx={{ justifyContent: "flex-end", display: "flex", flexDirection: "column", gap: "10px"}}>
                                <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                                    <FavoriteBorderIcon sx={{color: isFavorite ? theme.palette.cartIcons.active : theme.palette.cartIcons.main}} />
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
                                style={{objectFit: "contain", margin: "0 auto", display: "block", width: "100%"}}
                            />
                        </LazyLoad>
                    </MuiLink>

                    <Box sx={{paddingTop: "20px"}}>

                        <MuiLink component={RouterLink} underline='none' color="#000000" to={PRODUCT_ROUTE(product.id)}>
                            <Tooltip 
                                title={
                                    <Typography sx={{ fontSize: "16px" }}>
                                    {product.title}
                                    </Typography>
                                } 
                                arrow 
                                >
                                <Typography 
                                    color="text.main" 
                                    sx={{
                                    fontSize: "14px",
                                    display: "-webkit-box", 
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                    lineHeight: "1.2em",
                                    maxHeight: "2.4em"
                                    }}
                                >
                                    {product.title}
                                </Typography>
                            </Tooltip>
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

                        {!matches900 && isHovered && (
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