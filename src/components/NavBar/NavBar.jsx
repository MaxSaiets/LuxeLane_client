import React, { useContext, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import CatalogMenuModal from './CatalogMenuModal/CatalogMenuModal';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import MyDrawer from './MyDrawer/MyDrawer';

import { useNavigate } from "react-router-dom";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
// color mode
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../../theme';
import { useMediaQuery, useTheme } from '@mui/material';

import { USERPROFILE_ROUTE, MAIN_ROUTE, BASKET_ROUTE, USERFAVORITES_ROUTE } from '../../utils/consts';
import AuthPopup from '../Popups/AuthPopup/AuthPopup';
import { RootStoreContext } from '../../store/RootStoreProvider';

import { observer } from 'mobx-react-lite';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== 'paddingLeft',
})(({ theme, paddingLeft }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: paddingLeft || `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



const PrimarySearchAppBar = observer(() => {

  const {userStore, basketStore, favoritesStore} = useContext(RootStoreContext);
  const navigate = useNavigate();

  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
  const matches400 = useMediaQuery(theme.breakpoints.down('ssm'));

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    if(userStore.isAuth) {
      navigate(USERPROFILE_ROUTE);
    } else{
      setIsAuthPopupOpen(true);
    }
  };

  const handleUserFavoritesClick = () => {
    if(userStore.isAuth) {
      navigate(USERFAVORITES_ROUTE);
    } else{
      setIsAuthPopupOpen(true);
    }
  };

  const handleUserBasketClick = () => {
    if(userStore.isAuth) {
      navigate(BASKET_ROUTE);
    } else{
      setIsAuthPopupOpen(true);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleAuthPopupClose = () => {
    setIsAuthPopupOpen(false);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem onClick={handleUserBasketClick}>
        <IconButton
          size="large"
          aria-label="show basket"
          color="inherit"
        >
          <Badge badgeContent={basketStore.basketCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Basket</p>
      </MenuItem>

      <MenuItem onClick={handleUserFavoritesClick}>
        <IconButton size="large" aria-label="show favorites" color="inherit">
          <Badge badgeContent={favoritesStore.favoriteListCount} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Favorites</p>
      </MenuItem>

      <MenuItem>
        <IconButton size="large" aria-label="show new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton> 
        <p>Messages</p>
      </MenuItem>

      <MenuItem onClick={colorMode.toggleColorMode}>
        <IconButton sx={{padding: "12px"}} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <p>Color mode</p>
      </MenuItem>

    </Menu>
  );

  const [opentoggleDrawer, setOpentoggleDrawer] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpentoggleDrawer(newOpen);
  };

  return (
    <Box sx={{ zIndex: 1000, position: "sticky", top: 0}}>
      <AppBar position="static" sx={(theme) => ({ backdropFilter: "saturate(180%) blur(20px)", backgroundColor: alpha(theme.palette.primary.main, 0.7) })}>
        <Toolbar sx={{ padding: matches400 ? "0px 8px" : undefined, position: "relative"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, marginRight: "0px" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          
          <Drawer open={opentoggleDrawer} onClose={toggleDrawer(false)}>
            <MyDrawer toggleDrawer={toggleDrawer}  />
          </Drawer>
          
          <CatalogMenuModal />

          <IconButton 
            disableRipple 
            size="large" 
            color="inherit"
            onClick={() => navigate(MAIN_ROUTE)}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: 'block' }}
            >
              LuxeLane
            </Typography>
          </IconButton>

          <Search sx={{
            marginRight: matches600 ? '0px' : undefined,
            width: matches400 ? '20%' : matches600 ? '30%' : undefined,
            position: matches600 ? 'absolute' : 'relative',
            right: matches600 ? '61px' : undefined,
          }}>
            <SearchIconWrapper sx={{padding: matches400 ? "0px 8px" : "0px 16px"}}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              paddingLeft={matches400 ? 'calc(1em + 20px)' : undefined}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

              <IconButton sx={{padding: "12px"}} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              <IconButton size="large" aria-label="show favorites" color="inherit" onClick={handleUserFavoritesClick}>
                <Badge badgeContent={favoritesStore.favoriteListCount} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>

              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>

              <IconButton size="large" aria-label="show basket" color="inherit" onClick={handleUserBasketClick}>
                <Badge badgeContent={basketStore.basketCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

            </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

      <AuthPopup open={isAuthPopupOpen} setOpen={handleAuthPopupClose} /> 
    </Box>
  );
});

export default PrimarySearchAppBar;