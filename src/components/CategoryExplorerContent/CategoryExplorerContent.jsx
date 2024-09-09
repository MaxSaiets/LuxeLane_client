import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography, Grid } from "@mui/material";

import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from "react-router-dom";

import { RootStoreContext } from "../../store/RootStoreProvider";
import { PRODUCTSLISTPAGE_ROUTE } from "../../utils/consts";

import SliderSlick from "../Slider/SliderSlick";

import { fetchProductsForAdsBlock } from "../../http/blockAdsApi";
import ContentBlockSlider from "../ContentBlocks/ContentBlockSlider/ContentBlockSlider";

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CategoryExplorerContent = observer(() => {
    const { categoryName } = useParams();
    const decodedCategoryName = decodeURIComponent(categoryName).replace(/__/g, ', ').replace(/_/g, ' ');
    
    const { catalogStore, userStore } = useContext(RootStoreContext);

    const [dataForAdsBlockSlider, setDataForAdsBlockSlider] = useState([]);

    const theme = useTheme();
    const matches900 = useMediaQuery(theme.breakpoints.down("md"));
    const matches600 = useMediaQuery(theme.breakpoints.down("sm"));
    const matches400 = useMediaQuery(theme.breakpoints.down("ssm"));

    const generateCategoryExplorerRoute = (name) => {
        if(name){
            return PRODUCTSLISTPAGE_ROUTE(encodeURIComponent(name.replace(/[\s,]/g, '_')));
        }
    }

    useEffect(() => {
        if(userStore.isAuth){
            fetchProductsForAdsBlock({itemsCount: 14, userId: userStore.user.id}).then(data => setDataForAdsBlockSlider(data));
        } else {
            fetchProductsForAdsBlock({itemsCount: 14}).then(data => setDataForAdsBlockSlider(data));
        }
    }, [userStore.isAuth, userStore.user.id]);

    return (
        <Box sx={{width: "100%", height: "auto", display: "flex", flexDirection: "row", paddingBottom: matches600 ? "56px" : undefined }}>

            <Box sx={{ width: "100%", padding: matches900 ? "8px" : "20px 16px" }}>

                <Box>
                    <Typography variant="h5" sx={{textAlign: "left", marginBottom: "20px"}}>{decodedCategoryName}</Typography>
                </Box>

                <Box sx={{width: "100%", margin: "0 auto",  }}>
                    <SliderSlick />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", marginY: matches900 ? "15px" : "32px" }}>
                    <Grid container spacing={2} >
                        {catalogStore.catalogСategories.map((item, index) => {
                            if (item.categoryName === decodedCategoryName) {
                                return item.subCategories.map((subCategory, subIndex) => (
                                    <Grid item xs={12} smm={6} sm={6} md={4} lg={3} key={`${index}-${subIndex}`}>
                                        <Box sx={{ height: "100%", border: "1px solid #7a7878", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "10px"}}>
                                            <MuiLink component={RouterLink} sx={{alignContent: "center", borderRadius: "12px 12px 0 0" , backgroundColor: "rgba(0, 0, 0, 0.1)", overflow: "hidden"}} underline="none" color="text.main" to={generateCategoryExplorerRoute(subCategory.subCategoryName)}>
                                                <img
                                                    src={subCategory.subCategoryImage}
                                                    alt={subCategory.subCategoryName}
                                                    loading="lazy"
                                                    style={{ 
                                                        maxWidth: "100%", 
                                                        maxHeight: "200px",
                                                        objectFit: "contain",
                                                        display: "block",
                                                        margin: "auto",
                                                    }}
                                                />
                                            </MuiLink>

                                            <Box sx={{padding: "5px 10px"}}>
                                                <MuiLink component={RouterLink} underline="none" color="text.main" to={generateCategoryExplorerRoute(subCategory.subCategoryName)}>
                                                    <Typography variant="h5" sx={{fontWeight: "500"}} >{subCategory.subCategoryName}</Typography>
                                                </MuiLink>

                                                {subCategory.types.map((type, typeIndex) => (
                                                    <MuiLink component={RouterLink} underline="hover" color="text.main" key={typeIndex} to={generateCategoryExplorerRoute(type.typeName)}>
                                                        <Typography sx={{fontSize: "16px"}} key={typeIndex}>
                                                            {type.typeName}
                                                        </Typography>
                                                    </MuiLink>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Grid>
                                ));
                            } else{
                                return null;
                            }
                        })}
                    </Grid>
                </Box>

                <Box sx={{height: "auto"}}>
                    <ContentBlockSlider 
                        sectionTitle={"Pеклама"} 
                        data={dataForAdsBlockSlider}  
                    />  
                </Box>

            </Box>
        </Box>
    );
});

export default CategoryExplorerContent;