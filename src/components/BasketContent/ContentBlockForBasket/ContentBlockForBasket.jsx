import React, {useContext} from "react";
import { Box, Typography, Button, Tooltip } from "@mui/material";

import ContentBlockTitleSimple from "../../ContentBlocks/ContentBlockTitleSimple/ContentBlockTitleSimple";
import { useTheme, useMediaQuery } from '@mui/material';

import { RootStoreContext } from "../../../store/RootStoreProvider";

import CardWrapperBasket from "../CardWrapperBasket/CardWrapperBasket";
import { observer } from "mobx-react-lite";

const ContentBlockForBasket = observer(() => {
    const { basketStore } = useContext(RootStoreContext);
    const theme = useTheme();
    const matches900 = useMediaQuery(theme.breakpoints.down('md'));
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));


    const OrderDetails = ({ basketStore, theme, matches600 }) => (
        <Box 
            sx={{
                width: matches600 ? "100%" : undefined, 
                display: matches600 ? "flex" : undefined, 
                flexDirection: "column",
                gap: matches600 ? "0px" : "10px",
                position: "sticky",
                top: matches600 ? "auto" : "126px",
                bottom: matches600 ? "66px" : "auto",
            }}
        >
            <Box sx={{
                border: "2px solid #7b7a7a",
                borderRadius: "8px",
                bgcolor: theme.palette.leftBar.main,

                padding: "10px",
                ...(matches600 && {
                    "&::before": {
                        content: "''",
                        position: "absolute",
                        width: "100vw",
                        height: "calc(100% + 10px)",
                        top: "0px",
                        left: "-20px",
                        backdropFilter: "saturate(180%) blur(20px)",
                        zIndex: "-1",                
                    }
                })
                }}
            >

                <Typography variant="h6">Order details:</Typography>
                
                {basketStore.basket.map((product, index) => (
                    <Box key={index} sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                        <Tooltip 
                            title={
                                <Typography sx={{ fontSize: "16px" }}>
                                {product.title}
                                </Typography>
                            } 
                            arrow 
                            >
                            <Typography 
                                color="text.main" 
                                sx={{
                                fontSize: "14px",
                                display: "-webkit-box", 
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                lineHeight: "1.2em",
                                maxHeight: "2.4em"
                                }}
                            >
                                {product.title}
                            </Typography>
                        </Tooltip>
        
                        <Typography 
                            sx={{ 
                                whiteSpace: "nowrap",
                                fontSize: matches600 ? "12px" : "auto"
                            }}
                        >
                            {product.price * product.quantity}₴ x {product.quantity}
                        </Typography>
                    </Box>
                ))}
        
                <Box>
                    <Typography variant="h6">Total amount:</Typography>
                    <Typography variant="h4" sx={{color: "#0b990b", fontSize: matches600 ? "20px" : "auto", paddingBottom: "5px"}}>
                        {basketStore.totalAmount}₴
                    </Typography>
                </Box>
            
                <Box>
                    <Button 
                        variant="contained" 
                        sx={{ 
                            width: "100%", 
                            padding: "10px 20px", 
                            backgroundColor: "#ff0000",
                            color: "theme.palette.text.main",
                            justifyContent: "center",
                            '&:hover': {
                                backgroundColor: "#cc0000"
                            },
                            '&:active': {
                                backgroundColor: "#990000"
                            }
                        }}
                    >
                        Order
                    </Button>
                </Box>
            </Box>

        </Box>
    );

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: matches600 ? "10px" : "20px", height: "auto"}}>

            <ContentBlockTitleSimple sectionTitle={"Basket"} />

            <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: matches600 ? "column" : "row", gap: matches600 ? "20px" : "2%", flexWrap: matches600 ? "wrap" : "nowrap" }}>
                <Box sx={{width: matches600 ? "100%" : matches900 ? "60%" : "75%", display: "flex", flexDirection: "column", position: "relative"}}>
                    {basketStore.basket.map((product, index) => (
                        <CardWrapperBasket product={product} key={index} />
                    ))}
                </Box>

                {matches600
                    ? 
                    <OrderDetails basketStore={basketStore} theme={theme} matches600={matches600} />
                    :
                    <Box sx={{width: matches600 ? "100%" : matches900 ? "40%" : "25%", display: "flex", flexDirection: "column" }}>
                        <OrderDetails basketStore={basketStore} theme={theme} matches600={matches600} />
                    </Box>
                }
            </Box>
        </Box>

    );
});

export default ContentBlockForBasket;