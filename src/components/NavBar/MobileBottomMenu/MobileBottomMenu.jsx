import React, { Fragment, useState, useContext } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router-dom';
import CatalogMenuModal from '../CatalogMenuModal/CatalogMenuModal';
import { USERFAVORITES_ROUTE, MAIN_ROUTE, BASKET_ROUTE, USERPROFILE_ROUTE } from '../../../utils/consts';

import { Badge } from '@mui/material';
import { RootStoreContext } from '../../../store/RootStoreProvider';
import { styled } from '@mui/material/styles';

const MobileBottomMenu = () => {
  const navigate = useNavigate();
  const { basketStore } = useContext(RootStoreContext);
  const [catalogOpen, setCatalogOpen] = useState(false);
  
  const [value, setValue] = useState(0);

  const handleOpenCatalog = () => {
    setCatalogOpen(true);
  };

  const handleCloseCatalog = () => {
    setCatalogOpen(false);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 2,
      top: 2,
      padding: '0 0px',
      minWidth: "15px",
      height: "15px",
    },
  }));

  return (
    <Fragment>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.2)',
          "& .Mui-selected": {
            color: "#16C72E",
            "& svg": {
              color: "#16C72E", 
            }
          },
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => navigate(MAIN_ROUTE)} />
        <BottomNavigationAction label="Catalog" icon={<CategoryIcon />} onClick={handleOpenCatalog} />
        <BottomNavigationAction label="Basket" onClick={() => navigate(BASKET_ROUTE)}
          icon={
            <StyledBadge badgeContent={basketStore.basketCount} color="error">
              <ShoppingCartIcon />
            </StyledBadge>
          }/>
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={() => navigate(USERFAVORITES_ROUTE)} />
        <BottomNavigationAction label="More" icon={<ManageAccountsIcon />} onClick={() => navigate(USERPROFILE_ROUTE)} />
      </BottomNavigation>

      <CatalogMenuModal open={catalogOpen} onClose={handleCloseCatalog} />
    </Fragment>
  );
};

export default MobileBottomMenu;