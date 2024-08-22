import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Box, useMediaQuery, Typography, Grid } from "@mui/material";

import { useMode } from "../../theme";
import { useParams } from "react-router-dom";

import { RootStoreContext } from "../../store/RootStoreProvider";
import { PRODUCTSLISTPAGE_ROUTE } from "../../utils/consts";

import SliderSlick from "../Slider/SliderSlick";

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CategoryExplorerContent = observer(() => {
    const { categoryName } = useParams();
    const decodedCategoryName = decodeURIComponent(categoryName).replace(/__/g, ', ').replace(/_/g, ' ');
    
    const { catalogStore } = useContext(RootStoreContext);

    const [theme, colorMode] = useMode();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("leftBar"));

    const generateCategoryExplorerRoute = (name) => {
        if(name){
            return PRODUCTSLISTPAGE_ROUTE(encodeURIComponent(name.replace(/[\s,]/g, '_')));
        }
    }

    return (
        <Box sx={{width: "100%", height: "auto", display: "flex", flexDirection: "row" }}>

            <Box sx={{ width: "100%", padding: "30px" }}>

                <Box>
                    <Typography variant="h5" sx={{textAlign: "left", marginBottom: "20px"}}>{decodedCategoryName}</Typography>
                </Box>

                <Box sx={{width: "100%", padding: " 0 30px", margin: "0 auto" }}>
                    <SliderSlick />
                </Box>


                <Box sx={{ display: "flex", flexDirection: "column", gap: "50px" }}>
                    <Grid container spacing={2}>
                        {catalogStore.catalogСategories.map((item, index) => {
                            if (item.categoryName === decodedCategoryName) {
                                return item.subCategories.map((subCategory, subIndex) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={`${index}-${subIndex}`}>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                            <MuiLink component={RouterLink} underline="none" color="text.main" to={generateCategoryExplorerRoute(subCategory.subCategoryName)}>
                                                <img
                                                    src={subCategory.subCategoryImage}
                                                    alt={subCategory.subCategoryName}
                                                    style={{ width: "100px", height: "100px", objectFit: "contain" }}
                                                />
                                            </MuiLink>

                                            <MuiLink component={RouterLink} underline="none" color="text.main" to={generateCategoryExplorerRoute(subCategory.subCategoryName)}>
                                                <Typography variant="h5">{subCategory.subCategoryName}</Typography>
                                            </MuiLink>

                                            {subCategory.types.map((type, typeIndex) => (
                                                <MuiLink component={RouterLink} underline="none" color="text.main" key={typeIndex} to={generateCategoryExplorerRoute(type.typeName)}>
                                                    <Typography variant="h6" key={typeIndex}>
                                                        {type.typeName}
                                                    </Typography>
                                                </MuiLink>
                                            ))}
                                        </Box>
                                    </Grid>
                                ));
                            } else{
                                return null;
                            }
                        })}
                    </Grid>
                </Box>

            </Box>
        </Box>
    );
});

export default CategoryExplorerContent;