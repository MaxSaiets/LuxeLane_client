import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { Box, useMediaQuery, Typography, Grid } from "@mui/material";

import { useMode } from "../../theme";
import { useParams, useNavigate } from "react-router-dom";

import { CatalogStoreContext } from "../..";

import { PAGE404_ROUTE, PRODUCTSLISTPAGE_ROUTE } from "../../utils/consts";

import SliderSlick from "../MainContent/Slider/SliderSlick";
import { getCategoryTypes } from "../../http/typeApi";

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CategoryExplorerContent = observer(() => {
    const { categoryName } = useParams();
    const decodedCategoryName = decodeURIComponent(categoryName).replace(/__/g, ', ').replace(/_/g, ' ');
    
    const navigate = useNavigate();
    const catalogStore = useContext(CatalogStoreContext);

    const [subCategories, setSubCategories] = useState([]);
    const [subCategTypesData, setSubCategTypesData] = useState([]);

    
    const checkCategory = async () => {
        const categoryExists = await catalogStore.checkCategoryExists(decodedCategoryName);

        if (!categoryExists) {
            navigate(PAGE404_ROUTE);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    catalogStore.getCatalogCategories(),
                    catalogStore.getCatalogSubCategories()
                ]);
    
                checkCategory();
    
                const categoryData = await catalogStore.getCategoryDataByName(decodedCategoryName);
                const subCategories = await catalogStore.getSubCategoriesForCategory(categoryData.name);   
    
                setSubCategories(subCategories);
                
                const response = await getCategoryTypes(categoryData);

                setSubCategTypesData(response);
            } catch (error) {
                console.error('Failed to fetch category data:', error);
            }
        };
    
        fetchData();
    }, [catalogStore]);

    const [theme, colorMode] = useMode();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("leftBar"));


    const generateCategoryExplorerRoute = (name) => {
        return PRODUCTSLISTPAGE_ROUTE(encodeURIComponent(name.replace(/[\s,]/g, '_')));
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
                        {subCategTypesData.map((subCategory, index) => {
                            const subCategoryName = Object.keys(subCategory)[0];
                            const subCategoryData = subCategories.find(sc => sc.name === subCategoryName);

                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                                        {subCategoryData && subCategoryData.images[0] && (
                                            <MuiLink component={RouterLink} underline='none' color="text.main" to={generateCategoryExplorerRoute(subCategoryName)}>
                                                <img src={subCategoryData.images[0].imgSrc} alt={subCategoryName} />
                                            </MuiLink>
                                        )}

                                        <MuiLink component={RouterLink} underline='none' color="text.main" to={generateCategoryExplorerRoute(subCategoryName)}>
                                            <Typography variant="h5">{subCategoryName}</Typography>
                                        </MuiLink>
                                        
                                        {subCategory[subCategoryName].map((type, index) => (
                                            type !== subCategoryName && (
                                                <MuiLink component={RouterLink} underline='none' color="text.main" key={index}  to={generateCategoryExplorerRoute(type)}>
                                                    <Typography variant="h6" key={index}>{type}</Typography>
                                                </MuiLink>
                                            )
                                        ))}
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>

            </Box>
        </Box>
    );
});

export default CategoryExplorerContent;