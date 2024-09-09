import React, { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from '../../store/RootStoreProvider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Grid } from '@mui/material';

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { CATEGORYEXPLORER_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';

import { useMediaQuery, useTheme } from '@mui/material';

const CatalogList = observer(({ categoriesModalOpen, closeModal, setSelectedCategoryForSubCategories = () => {}, isInMenu = false, gridSizes = "default"}) => {
    const {catalogStore} = useContext(RootStoreContext);
    const theme = useTheme();
    const matches900 = useMediaQuery(theme.breakpoints.down("md"));
    const matches600 = useMediaQuery(theme.breakpoints.down("sm"));
    const matches400 = useMediaQuery(theme.breakpoints.down("ssm"));
    
    const [selectedCategory, setSelectedCategory] = useState();

    const gridSizeTemplates = {
        default: {
            xs: 12,
            ssm: 12,
            sm: 12,
            msm: 12,
            md: 12,
            leftBar: 12,
            lg: 12,
            xl: 12,
            xxl: 12,
        },
        middle: {
            xs: 6,
            ssm: 6,
            sm: 4,
            msm: 4,
            md: 4,
            leftBar: 12,
            lg: 12,
            xl: 12,
            xxl: 12,
        },
    };
    const selectedGridSizes = gridSizeTemplates[gridSizes] || gridSizeTemplates.default;
    
    const handleCategoryClick = (item) => {
        setSelectedCategoryForSubCategories(item.categoryName);
    }

    const handleCategoryHover = (item) => {
        setSelectedCategoryForSubCategories(item.categoryName);
        setSelectedCategory(item.categoryName);
    }

    const categoryLinkLogic = (item) => {
        if (matches900) {
            if (!categoriesModalOpen) {
                return { to: CATEGORYEXPLORER_ROUTE(encodeURIComponent(item.categoryName.replace(/[\s,]/g, '_'))) };
            }
            return {};
        }
        return { onClick: closeModal, to: CATEGORYEXPLORER_ROUTE(encodeURIComponent(item.categoryName.replace(/[\s,]/g, '_'))) };
    };

    return (
        <Grid container>
            {catalogStore.catalogСategories.map((item, index) => (
                <Grid 
                    item 
                    key={index}
                    {...selectedGridSizes}
                    sx={{marginTop: matches400 ? "0px" : matches900 ? "5px" : "0px"}}
                    alignContent={"center"}
                >
                    <MuiLink 
                        component={RouterLink}
                        underline='none'
                        color="#000000"
                        {...categoryLinkLogic(item)}
                    >
                        <ListItemButton 
                            sx={{ 
                                py: 0,
                                minHeight: 32,
                                backgroundColor: isInMenu && item.categoryName === selectedCategory ? 'gray' : 'transparent',
                                padding: matches600 ? '0 8px' : '0 16px',
                                display: "flex",
                                flexDirection: "row",
                                gap: "8px",
                            }}
                            {...(matches900 
                                ? { onClick: () => handleCategoryClick(item) }
                                : { onMouseOver: () => handleCategoryHover(item) }
                            )}
                        >
                            <ListItemIcon sx={{ width: 28, height: 28, minWidth: "20px" }}>
                                <img 
                                    style={{maxWidth: "28px", objectFit: "contain"}}
                                    src={item.categoryImage}
                                    alt={item.categoryName}
                                />
                            </ListItemIcon>
                            
                            <ListItemText
                                primary={item.categoryName}
                                primaryTypographyProps={{ fontSize: matches400 ? 12 : 14, fontWeight: 'medium' }}
                            />
                        </ListItemButton>
                    </MuiLink>
                </Grid>
            ))}
        </Grid>
    );
});

export default CatalogList;
