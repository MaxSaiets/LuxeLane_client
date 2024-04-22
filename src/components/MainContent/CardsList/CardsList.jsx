import React, {useState} from "react";
import { Box, Button } from "@mui/material";
import CardWrapperSimle from "../CardWrapperSimple/CardWrapperSimple";

const CardsList = ({itemsCount, data}) => {
    const [showAllItems, setShowAllItems] = useState(false);
    const visibleItems = showAllItems ? data : data.slice(0, itemsCount);

    return (
        <>
            {visibleItems.map((item, index) => (
                <CardWrapperSimle key={index} item={item} />
            ))}
            {!showAllItems && data.length > itemsCount && (
                <Button 
                    variant="outlined" 
                    color="info" 
                    sx={{position: "absolute", bottom: "-12%", right: "0%"}}
                    onClick={setShowAllItems}
                >
                    Показати всі продукти
                </Button>
            )}
        </>
    );
};

export default CardsList