import React, { useContext, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PRODUCT_ROUTE } from '../../../utils/consts';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useTheme, useMediaQuery } from '@mui/material';

import { RootStoreContext } from "../../../store/RootStoreProvider";

import QuantitySelector from '../QuantitySelector/QuantitySelector';

const CardWrapperBasket = ({product}) => {
    const { basketStore, userStore, favoritesStore } = useContext(RootStoreContext);
    const [isInBasket, setIsInBasket] = useState(product.isInBasket);
    const [isFavorite, setIsFavorite] = useState(product.isFavorite);
    
    const theme = useTheme();

    const ITEM_HEIGHT = 48;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleBasketClick = () => {
        handleClose();

        if (isInBasket) {
            basketStore.removeProduct(userStore.user.id, product.id);
        } else {
            basketStore.addProduct(userStore.user.id, product.id);
        }
    };
    
    const handleFavoriteClick = () => {
        if (isFavorite) {
            setIsFavorite(false);
            favoritesStore.removeFavoriteProduct(userStore.user.id, product.id);
        } else {
            setIsFavorite(true);
            favoritesStore.addFavoriteProduct(userStore.user.id, product.id);
        }
    };

    const handleUpdateQuantity = ({productId, quantity}) => {
        basketStore.updateQuantity(userStore.user.id, productId, quantity);
    };

    const menu = (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 'auto',
                    },
                }}
            >
                <MenuItem onClick={handleBasketClick}>
                    <IconButton
                        size="medium"
                    >
                    <AddShoppingCartIcon sx={{ color: isInBasket ? theme.palette.cartIcons.active : theme.palette.cartIcons.main }} />
                    </IconButton>
                    {isInBasket ? 
                        <Typography>Remove from basket</Typography> 
                        : <Typography>Add to basket</Typography>
                    }
                </MenuItem>

                <MenuItem onClick={handleFavoriteClick}>
                    <IconButton 
                        size="medium"
                    >
                        <FavoriteBorderIcon sx={{ color: isFavorite ? theme.palette.cartIcons.active : theme.palette.cartIcons.main }}  />
                    </IconButton>
                    {isFavorite ? 
                        <Typography>Remove from favorites</Typography> 
                        : <Typography>Add to favorites</Typography>
                    }
                </MenuItem>
            
            </Menu>
        </div>
    );

    return (
        <Box sx={{ width: "100%", padding: "10px", borderBottom: "1px solid #ccc", display: "flex", flexDirection: "column", gap: "5px", justifyContent: "space-between" }}>
            <Box sx={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>

                <Box sx={{display: "flex", flexDirection: "row", gap: "10px"}}>
                    <MuiLink component={RouterLink} underline='none' color="#000000" to={PRODUCT_ROUTE(product.id)} sx={{display: "block", textAlign: "center", position: "relative"}}>
                        <LazyLoad once>
                            {product?.images && product.images.length > 0 && (
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    style={{maxHeight: "120px", width: "150px", objectFit: "contain"}}
                                />
                            )}
                        </LazyLoad>
                    </MuiLink>

                    <MuiLink component={RouterLink} underline='none' color="#000000" to={PRODUCT_ROUTE(product.id)}>
                        <Typography color="text.main" sx={{fontSize: "16px"}}>
                            {product.title}
                        </Typography>
                    </MuiLink>
                </Box>

                <Box>
                    {menu}
                </Box>
            </Box>

            <Box sx={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                
                <QuantitySelector data={product} updateQuantity={handleUpdateQuantity} />

                <Box>
                    <Typography color="text.secondary" sx={{fontSize: "14px", textDecoration: "line-through"}}>
                        {product?.discount && `${product.discount}₴`}
                    </Typography>

                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography color="text.secondary" sx={{fontSize: "24px", color: "red"}}>
                            {product.price * product.quantity}₴
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CardWrapperBasket;