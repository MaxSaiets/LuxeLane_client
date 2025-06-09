import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Box } from "@mui/material";

import SliderSlick from "../Slider/SliderSlick";
import ContentBlockSimple from "../ContentBlocks/ContentBlockSimple/ContentBlockSimple";
import ContentBlockSliderForFavorites from "../ContentBlocks/ContentBlockSliderForFavorites/ContentBlockSliderForFavorites";

import { fetchProductsForAdsBlock } from "../../http/blockAdsApi";
import ContentBlockSlider from "../ContentBlocks/ContentBlockSlider/ContentBlockSlider";

import ContentBlockVideo from "../ContentBlocks/ContentBlockVideo/ContentBlockVideo";

import LeftBar from "../LeftBar/LeftBar";
import CatalogList from "../CatalogList/CatalogList";

import { RootStoreContext } from "../../store/RootStoreProvider";

import { useTheme, useMediaQuery } from '@mui/material';

import { fetchFilteredProducts } from "../../http/productApi";

const data3Video = [
    {url: "https://www.youtube.com/watch?v=e7U1YZNgwnY"},
    {url: "https://www.youtube.com/watch?v=mX_8p7NaibQ"},
    {url: "https://www.youtube.com/watch?v=g45Va0gCwQ4"},
    {url: "https://www.youtube.com/watch?v=Y1_VsyLAGuk"},
    {url: "https://www.youtube.com/watch?v=tOqmrNvfoHk"},
    {url: "https://www.youtube.com/watch?v=Ij4kCKj-XXI"},
    {url: "https://www.youtube.com/watch?v=Ij4kCKj-XXI"},
    {url: "https://www.youtube.com/watch?v=Ij4kCKj-XXI"},
    {url: "https://www.youtube.com/watch?v=Ij4kCKj-XXI"},
    {url: "https://www.youtube.com/watch?v=Ij4kCKj-XXI"},
];

const MainContent = observer(() => {
    const theme = useTheme(); 
    const matches1200 = useMediaQuery(theme.breakpoints.down('lg'));
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("leftBar"));

    const { userStore, recentryViewedStore, favoritesStore, catalogStore } = useContext(RootStoreContext);

    const [dataForBlockSlider, setDataForBlockSlider] = useState([]);

    const [dataResult, setDataResult] = useState([]);

    useEffect(() => {
        if(catalogStore.isLoaded) {
            fetchFilteredProducts({productsCount: 40, category: catalogStore.getRandomDataName("category")}).then(data => setDataResult(data));;
        }
    }, [catalogStore.isLoaded]);

    useEffect(() => {
        fetchProductsForAdsBlock({itemsCount: 14}).then(data => setDataForBlockSlider(data));
    }, [userStore.isAuth, userStore.user.id]);

    return (
        <Box sx={{width: "100%", height: "auto", display: "flex", flexDirection: "row", paddingBottom: matches600 ? "56px" : undefined }}>

            {!isSmallScreen && (
            <Box sx={{ width: "240px" }}>
               <LeftBar />
            </Box>
            )}

            <Box sx={{ 
                width: isSmallScreen ? "100%" : "calc(100% - 240px)",  
                padding: matches600 ? "10px 8px 0px 8px" : matches1200 ? "10px 20px 0px 20px" : "0px 30px 0px 30px",
            }}>

                <Box sx={{width: "100%", padding: matches600 ? "0px" : matches1200 ? "0px 0px 0px 0px" : "0 0px", margin: "0 auto" }}>
                    <SliderSlick />
                </Box>

                {isSmallScreen && (
                    <Box sx={{paddingTop: "10px"}}>
                        <CatalogList gridSizes={"middle"} />
                    </Box>
                )}
                    
                {dataForBlockSlider.length > 0 && (
                    <Box sx={{}}>
                        <ContentBlockSlider 
                            sectionTitle={"Block with advertising"} 
                            data={dataForBlockSlider}  
                        />  
                    </Box>
                )}

                {userStore.isAuth && recentryViewedStore.hasRecentlyViewedProducts && (
                    <Box sx={{}}>
                        <ContentBlockSliderForFavorites
                            sectionTitle={"Reviewed products"}
                            data={recentryViewedStore.recentlyViewedProducts}
                        />  
                    </Box>
                )}

                {userStore.isAuth && favoritesStore.hasUserFavoritesList && (
                    <Box sx={{}}>
                        <ContentBlockSliderForFavorites
                            sectionTitle={"Favorites products"}
                            data={favoritesStore.userFavoriteList}
                        /> 
                    </Box>
                )}

                {userStore.isAuth && recentryViewedStore.hasRecentlyViewedProducts && (
                    <Box sx={{}}>
                        <ContentBlockSlider
                            sectionTitle={"Reviewed products"}
                            data={recentryViewedStore.recentlyViewedProducts}
                        />  
                    </Box>
                )}

                <Box sx={{}}>
                    <ContentBlockSlider
                        sectionTitle={"An example of output of goods of a certain category"}
                        data={dataResult}
                    /> 
                </Box>

                <Box sx={{}}>
                    <ContentBlockSimple
                        sectionTitle={"An example of output of goods of a certain category"}
                        data={dataResult}
                    /> 
                </Box>

                <Box sx={{}}>
                    <ContentBlockVideo sectionTitle={"New videos on the channel"} chanelTitle={"LuxeLane"} sectionLink={"https://www.youtube.com"} data={data3Video} />  
                </Box>

            </Box>
        </Box>
    );
});

export default MainContent;