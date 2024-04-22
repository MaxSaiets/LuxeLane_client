import React from "react";
import { observer } from "mobx-react-lite";

import { Box, useMediaQuery} from "@mui/material";

import SliderSlick from "./Slider/SliderSlick";
import ContentBlockSimple from "./ContentBlockSimple/ContentBlockSimple";

import img from "./AdsImg/1.jpg"
import ContentBlockVideo from "./ContentBlockVideo/ContentBlockVideo";
import { useMode } from "../../theme";

import LeftBar from "../LeftBar/LeftBar";
import CatalogList from "../CatalogList/CatalogList";

const data = [
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
];
const data2 = [
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
    {img: {img}, title: `Ноутбук Apple MacBook Air 15.3" M2 8/512GB`, price: "73 499", discount: "17 699"},
];
const data3Video = [
    {url: "https://www.youtube.com/watch?v=e7U1YZNgwnY"},
    {url: "https://www.youtube.com/watch?v=mX_8p7NaibQ"},
    {url: "https://www.youtube.com/watch?v=g45Va0gCwQ4"},
    {url: "https://www.youtube.com/watch?v=Y1_VsyLAGuk"},
    {url: "https://www.youtube.com/watch?v=tOqmrNvfoHk"},
    {url: "https://www.youtube.com/watch?v=Ij4kCKj-XXI"},
];

const MainContent = observer(() => {
    const [theme, colorMode] = useMode();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("leftBar"));

    return (
        <Box sx={{width: "100%", height: "auto", display: "flex", flexDirection: "row" }}>

            {!isSmallScreen && (
            <Box sx={{ width: "240px" }}>
               <LeftBar />
            </Box>
            )}

            <Box sx={{ width: isSmallScreen ? "100%" : "calc(100% - 240px)", padding: "30px" }}>

                <Box sx={{width: "100%", padding: " 0 30px", margin: "0 auto" }}>
                    <SliderSlick />
                </Box>

                {isSmallScreen && (
                <Box>
                    <CatalogList />
                </Box>
                )}
                    
                <Box sx={{}}>
                    <ContentBlockSimple itemsCount={5} sectionTitle={"Pеклама"} data={data}  />  
                </Box>

                <Box sx={{}}>
                    <ContentBlockSimple itemsCount={3} sectionTitle={"Pеклама"} data={data2}  />  
                </Box>

                <Box sx={{}}>
                    <ContentBlockVideo itemsCount={5} sectionTitle={"Нові відео на каналі"} chanelTitle={"LuxeLane"} sectionLink={"https://www.youtube.com"} data={data3Video}  />  
                </Box>

                <Box sx={{}}>
                    <ContentBlockSimple itemsCount={5} sectionTitle={"Pеклама"} data={data}  />  
                </Box>

                <Box sx={{}}>
                    <ContentBlockSimple itemsCount={5} sectionTitle={"Pеклама"} data={data}  />  
                </Box>

                <Box sx={{}}>
                    <ContentBlockSimple itemsCount={3} sectionTitle={"Pеклама"} data={data2}  />  
                </Box>
                <Box sx={{}}>
                    <ContentBlockSimple itemsCount={3} sectionTitle={"Pеклама"} data={data2}  />  
                </Box>
                <Box sx={{}}>
                    <ContentBlockSimple itemsCount={3} sectionTitle={"Pеклама"} data={data2}  />  
                </Box>
                <Box sx={{}}>
                    <ContentBlockSimple itemsCount={3} sectionTitle={"Pеклама"} data={data2}  />  
                </Box>
                <Box sx={{}}>
                    <ContentBlockSimple itemsCount={3} sectionTitle={"Pеклама"} data={data2}  />  
                </Box>
                <Box sx={{}}>
                    <ContentBlockSimple itemsCount={3} sectionTitle={"Pеклама"} data={data2}  />  
                </Box>
            </Box>
        </Box>
    );
});

export default MainContent;