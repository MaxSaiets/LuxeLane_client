import React, {useState} from "react";
import { Box, Button } from "@mui/material";
import CardWrapperVideo from "../CardWrapperVideo/CardWrapperVideo";

const CardsListVideo = ({itemsCount, data}) => {
    itemsCount = itemsCount || data.length;
    
    return (
        <>
            {data.slice(0, itemsCount).map((item, index) => (
                <CardWrapperVideo key={index} item={item} />
            ))}
        </>
    );
};

export default CardsListVideo