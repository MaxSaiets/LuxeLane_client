import React, { Fragment, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import CatalogMenuModal from '../CatalogMenuModal/CatalogMenuModal';
import { USERFAVORITES_ROUTE, MAIN_ROUTE, BASKET_ROUTE, USERPROFILE_ROUTE } from '../../../utils/consts';

const MobileBottomMenu = () => {
  const navigate = useNavigate();
  const [catalogOpen, setCatalogOpen] = useState(false);

  const handleOpenCatalog = () => {
    setCatalogOpen(true);
  };

  const handleCloseCatalog = () => {
    setCatalogOpen(false);
  };

  return (
    <Fragment>
      <BottomNavigation
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#fff',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <BottomNavigationAction label="Catalog" icon={<CategoryIcon />} onClick={handleOpenCatalog} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={() => navigate(USERFAVORITES_ROUTE)} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => navigate(MAIN_ROUTE)} />
        <BottomNavigationAction label="Basket" icon={<ShoppingCartIcon />} onClick={() => navigate(BASKET_ROUTE)} />
        <BottomNavigationAction label="Profile" icon={<AccountCircle />} onClick={() => navigate(USERPROFILE_ROUTE)} />
      </BottomNavigation>

      <CatalogMenuModal open={catalogOpen} onClose={handleCloseCatalog} />
    </Fragment>
  );
};

export default MobileBottomMenu;