import React, { useContext } from "react";
import { Box, Typography } from '@mui/material';
import { CatalogStoreContext } from "../../..";
import { Link } from "@mui/material";


const SubCatalogList = ({category}) => {
    const catalog = useContext(CatalogStoreContext);

    const subCategories = catalog.catalogSubСategories
        .filter(item => category ? item.category.name === category : true)
        .reduce((acc, item) => {
            if (!acc[item.category.name]) {
                acc[item.category.name] = [];
            }
            acc[item.category.name].push(item);
            return acc;
        }, {});

    return (
        <Box>
            {Object.entries(subCategories).map(([categoryName, subCategories]) => (
                <Box key={categoryName} sx={{display: "flex", flexDirection: "column", gap: "5px"}}>
                    <Link underline="hover" variant="h6" color="black" sx={{cursor: "pointer"}}>{categoryName}</Link>

                    {subCategories.map((subCategory) => (
                        <Link underline="hover" variant="body" color="black" key={subCategory.id} sx={{cursor: "pointer"}}>
                            {subCategory.name}
                        </Link>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export default SubCatalogList;