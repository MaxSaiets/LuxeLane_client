import React, { useContext } from "react";
import { Box, Typography } from '@mui/material';
import { Fragment } from "react";
import { RootStoreContext } from "../../../store/RootStoreProvider";
import { PRODUCTSLISTPAGE_ROUTE } from "../../../utils/consts";

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useTheme } from '@mui/material';

const SubCatalogList = ({ category, closeModal }) => {
    const { catalogStore } = useContext(RootStoreContext);
    const theme = useTheme();

    const generateCategoryExplorerRoute = (name) => {
        if (name) {
            return PRODUCTSLISTPAGE_ROUTE(encodeURIComponent(name.replace(/[\s,]/g, '_')));
        }
    };

    return (
        <Box>
            {catalogStore.catalogСategories.map((item, index) => {
                if (item.categoryName === category) {
                    return (
                        <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            {item.subCategories.map((subItem, subIndex) => (
                                <Fragment key={subIndex}>
                                    <MuiLink
                                        component={RouterLink}
                                        underline="hover"
                                        color="text.main"
                                        sx={{ cursor: "pointer" }}
                                        to={generateCategoryExplorerRoute(subItem.subCategoryName)}
                                        onClick={closeModal}
                                    >
                                        <Typography sx={{ fontSize: "16px", color: theme.palette.text.catalogList }}>
                                            {subItem.subCategoryName}
                                        </Typography>
                                    </MuiLink>
                                    
                                    {subItem.types.map((type, typeIndex) => (
                                        <MuiLink
                                            component={RouterLink}
                                            underline="hover"
                                            color="text.main"
                                            key={typeIndex}
                                            sx={{ cursor: "pointer", marginLeft: "8px" }}
                                            to={generateCategoryExplorerRoute(type.typeName)}
                                            onClick={closeModal}
                                        >
                                            <Typography sx={{ fontSize: "14px", color: theme.palette.text.catalogList}}>
                                                {type.typeName}
                                            </Typography>
                                        </MuiLink>
                                    ))}
                                </Fragment>
                            ))}

                        </Box>
                    );
                } else {
                    return null;
                }
            })}
        </Box>
    );
};

export default SubCatalogList;
