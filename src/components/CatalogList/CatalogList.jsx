import React, { useContext, useEffect, useState } from 'react';
import { CatalogStoreContext } from "../../index";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Grid, useMediaQuery } from '@mui/material';
import { useMode } from '../../theme';

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { CATEGORYEXPLORER_ROUTE } from '../../utils/consts';

const CatalogList = ({setSelectedCategoryForSubCategories = () => {}, isInMenu = false}) => {
    const catalog = useContext(CatalogStoreContext);
    const [theme] = useMode();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("leftBar"));

    const [selectedCategory, setSelectedCategory] = useState();

    useEffect(() => {
        setSelectedCategory(catalog.catalogСategories[0]?.name);
        setSelectedCategoryForSubCategories(catalog.catalogСategories[0]?.name);
    }, [catalog.catalogCategories])

    const handleCategoryClick = (category) => {
        
    }
    const handleCategoryHover = (item) => {
        setSelectedCategoryForSubCategories(item.name);
        setSelectedCategory(item.name);
    }

    return (
        <Grid container>
            {catalog.catalogСategories.map((item, index) => (
                <Grid 
                    item 
                    xs={12} 
                    sm={isSmallScreen ? 6 : 12} 
                    md={isSmallScreen ? 4 : 12} 
                    lg={isSmallScreen ? 3 : 12} 
                    key={index}
                >
                    <MuiLink component={RouterLink} underline='none' color="#000000" to={CATEGORYEXPLORER_ROUTE(encodeURIComponent(item.name.replace(/[\s,]/g, '_')))}>
                        <ListItemButton 
                            sx={{ 
                                py: 0,
                                minHeight: 32,
                                backgroundColor: isInMenu && item.name === selectedCategory ? 'gray' : 'transparent' 
                            }}
                            onMouseOver={() => handleCategoryHover(item)}
                        >
                            <ListItemIcon sx={{ width: 28, height: 28, marginRight: "-8px" }}>
                                <img src={item.images[0]?.imgSrc} alt="" />
                            </ListItemIcon>
                            
                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                            />
                        </ListItemButton>
                    </MuiLink>
                </Grid>
            ))}
        </Grid>
    );
}

export default CatalogList;
