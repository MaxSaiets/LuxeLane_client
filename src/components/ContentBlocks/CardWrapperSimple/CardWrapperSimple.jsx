import React, {useState, useEffect} from 'react';
import { Box, Card, Tooltip, Chip, IconButton, Typography } from '@mui/material';

import LazyLoad from 'react-lazyload';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { PRODUCT_ROUTE } from '../../../utils/consts';

import { useTheme, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import { RootStoreContext } from '../../../store/RootStoreProvider';
import AuthPopup from '../../Popups/AuthPopup/AuthPopup';

const CardWrapperSimple = ({ product }) => {
  const theme = useTheme(); 
  const { userStore, favoritesStore } = useContext(RootStoreContext);
  const [isFavorite, setIsFavorite] = useState();

  const matches800 = useMediaQuery(theme.breakpoints.down('md'));

  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

  const handleAuthPopupClose = () => {
    setIsAuthPopupOpen(false);
  };

  const handleFavoriteClick = () => {
    if(userStore.isAuth){
        if (isFavorite) {
          product.isFavorite = false;
          favoritesStore.removeFavoriteProduct(product.id);
          setIsFavorite(false);
        } else {
          product.isFavorite = true;
          setIsFavorite(true);
          favoritesStore.addFavoriteProduct(product.id);
        }
    } else {
      setIsAuthPopupOpen(true);
    }
  };

  useEffect(() => {
    setIsFavorite(product.isFavorite);
  }, [product.isFavorite]);

  return (
    <Card sx={{height: "320px", maxHeight: "320px", padding:  matches800 ? "8px" : "10px", border: "1px solid", borderColor: "cardWrapper.border"}}>
      <Box sx={{padding: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Box sx={{paddingTop: "5px"}}>
            {product.discountPercentage && <Chip label={`-${product.discountPercentage}%`} variant="filled" color="error" size="small" sx={{fontSize: "12px", fontWeight: "700"}} />}
          </Box>

          <Box sx={{justifyContent: "flex-end", display: "flex", flexDirection: "column", gap: "10px"}}>
              <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                <FavoriteBorderIcon sx={{ color: isFavorite ? theme.palette.cartIcons.active : theme.palette.cartIcons.main}} />
              </IconButton>
          </Box>
        </Box>

        <MuiLink component={RouterLink} underline='none' color="#000000" to={PRODUCT_ROUTE(product.id)} sx={{display: "block", height: "170px", textAlign: "center", position: "relative"}}>
          <LazyLoad once>
            <img
              // height="auto"
              src={product?.images[0]}
              alt={product.title}
              style={{maxHeight: "170px", maxWidth: "100%", paddingTop: "5px", margin: "0 auto", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
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
          </Box>
        </Box>
      </Box>

    <AuthPopup open={isAuthPopupOpen} setOpen={handleAuthPopupClose} /> 

  </Card>

  );
};

export default CardWrapperSimple;