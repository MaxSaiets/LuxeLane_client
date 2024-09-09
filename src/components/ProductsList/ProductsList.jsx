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
 
    const handleAddToBasket = async (userId, productId) => {
        basketStore.addProduct(userId, productId);
    };
    const handleRemoveFromBasket = async (userId, productId) => {
        basketStore.removeProduct(userId, productId);
    };

    const handleAddToFavoriteList = async (userId, productId) => {
        favoritesStore.addFavoriteProduct(userId, productId);
    };
    const handleRemoveFromFavoriteList = async (userId, productId) => {
        favoritesStore.removeFavoriteProduct(userId, productId);
    };

    return (
        <Box>
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

            <Box sx={{ borderBottom: "1px solid gray", padding: "5px"}}>
                <Stack spacing={2} sx={{alignItems: "center"}}>
                    <Typography>Page: {page}</Typography>
                    <Pagination count={pageCount} page={page} onChange={handleChange} />
                </Stack>
            </Box>
        </Box>
    );
});

export default ProductsList;