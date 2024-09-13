import React, {useContext} from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProductCard from "../ProductCard/ProductCard";

import { RootStoreContext } from "../../store/RootStoreProvider";

const ProductsList = observer( ({ name, page, pageCount, setPage, products, fetchAndSetProducts }) => {
    const { basketStore, favoritesStore} = useContext(RootStoreContext);

    const handleChange = (event, pageNumber) => {
        setPage(pageNumber);

        fetchAndSetProducts({name, pageNumber});
    };
 
    const handleAddToBasket = async (productId) => {
        basketStore.addProduct(productId);
    };
    const handleRemoveFromBasket = async (productId) => {
        basketStore.removeProduct(productId);
    };

    const handleAddToFavoriteList = async (productId) => {
        favoritesStore.addFavoriteProduct(productId);
    };
    const handleRemoveFromFavoriteList = async (productId) => {
        favoritesStore.removeFavoriteProduct(productId);
    };

    return (
        <Box sx={{display: "flex", flexDirection: "column", height: "100%"}}>
            <Grid container>
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            product={product}
                            onAddToBasket={handleAddToBasket}
                            onRemoveFromBasket={handleRemoveFromBasket}
                            onAddToFavorites={handleAddToFavoriteList}
                            onRemoveFromFavorites={handleRemoveFromFavoriteList}
                        />
                    ))
                ) : (
                    <Typography variant="h6">
                        Nothing was found for your query, try changing your query.
                    </Typography>
                )}
            </Grid>    

            <Box sx={{ borderBottom: "1px solid gray", padding: "5px", marginTop: 'auto'}}>
                <Stack spacing={2} sx={{alignItems: "center"}}>
                    <Typography>Page: {page}</Typography>
                    <Pagination count={pageCount} page={page} onChange={handleChange} />
                </Stack>
            </Box>
        </Box>
    );
});

export default ProductsList;