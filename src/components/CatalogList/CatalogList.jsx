import React, { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from '../../store/RootStoreProvider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Grid } from '@mui/material';
import { useMode } from '../../theme';

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { CATEGORYEXPLORER_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';

import { useMediaQuery, useTheme } from '@mui/material';

const CatalogList = observer(({setSelectedCategoryForSubCategories = () => {}, isInMenu = false}) => {
    const {catalogStore} = useContext(RootStoreContext);
    const theme = useTheme();
    const matches600 = useMediaQuery(theme.breakpoints.down("sm"));
    const matches400 = useMediaQuery(theme.breakpoints.down("ssm"));
    const matches1100 = useMediaQuery(theme.breakpoints.down("leftBar"));

    const [selectedCategory, setSelectedCategory] = useState();

    // useEffect(() => {
    //     setSelectedCategory(catalogStore.catalogСategories[0].categoryName);
    //     setSelectedCategoryForSubCategories(catalogStore.catalogСategories[0].categoryName);
    // }, [catalogStore.catalogCategories])

    const handleCategoryClick = (category) => {
        
    }

    const handleCategoryHover = (item) => {
        setSelectedCategoryForSubCategories(item.categoryName);
        setSelectedCategory(item.categoryName);
    }

    return (
        <Grid container sx={{marginTop: matches1100 ? "15px" : "0px"}}>
            {catalogStore.catalogСategories.map((item, index) => (
                <Grid 
                    item 
                    key={index}
                    xs={6} 
                    ssm={6} 
                    sm={6} 
                    msm={6} 
                    md={3}
                    leftBar={12}
                    lg={12} 
                    xl={12} 
                    xxl={12}
                    sx={{marginTop: matches400 ? "0px" : matches1100 ? "5px" : "0px"}}
                >
                    <MuiLink component={RouterLink} underline='none' color="#000000" to={CATEGORYEXPLORER_ROUTE(encodeURIComponent(item.categoryName.replace(/[\s,]/g, '_')))}>
                        <ListItemButton 
                            sx={{ 
                                py: 0,
                                minHeight: 32,
                                backgroundColor: isInMenu && item.categoryName === selectedCategory ? 'gray' : 'transparent',
                                padding: matches600 ? '0 8px' : '0 16px',
                            }}
                            onMouseOver={() => handleCategoryHover(item)}
                        >
                            <ListItemIcon sx={{ width: 28, height: 28, marginRight: "-15px" }}>
                                <img style={{maxWidth: "35px", objectFit: "contain"}} src={item.categoryImage} alt={item.categoryName}  />
                            </ListItemIcon>
                            
                            <ListItemText
                                primary={item.categoryName}
                                primaryTypographyProps={{ fontSize: matches400 ? 8 : matches600 ? 12 : 14, fontWeight: 'medium' }}
                            />
                        </ListItemButton>
                    </MuiLink>
                </Grid>
            ))}
        </Grid>
    );
});

export default CatalogList;
