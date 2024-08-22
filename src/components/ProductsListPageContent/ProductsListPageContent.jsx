import React, { useState, useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography, Grid, Button, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../http/productsApi";
import ProductsFilters from "../ProductsList/ProductsFilters/ProductsFilters";
import ProductsList from "../ProductsList/ProductsList";

import { useContext } from "react";
import { RootStoreContext } from "../../store/RootStoreProvider";
 
const ProductsListPageContent = observer(() => {
    const {userStore} = useContext(RootStoreContext);

    const { name } = useParams();
    const decodedCategoryName = decodeURIComponent(name).replace(/__/g, ', ').replace(/_/g, ' ');
    
    const [productsData, setProductsData] = useState({minPrice: 0, maxPrice: 0, brands: []});
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [productsCount, setProductsCount] = useState(0);
    
    // FILTERS
    // TODO додати дефолтівні фільтри (ціна, бренди) назви
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleAddFilterOption = (filterType, option) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: [option]
        }));
    }
    const handleAppendFilterOption = (filterType, option) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: [...prev[filterType] || [], option]
        }));
    }

    const handleDeleteFilterOption = (filterType, option) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: (prev[filterType] || []).filter(o => Array.isArray(o) ? !o.every((val, index) => val === option[index]) : o !== option)
        }));
    };
    
    const handleClearFilters = () => {
        setSelectedFilters({});
    };

    const fetchAndSetProducts = useCallback(async (options) => {
        const { categoryName = decodedCategoryName, pageNumber = page } = options;
        const userId = userStore.user ? userStore.user.id : null;

        const response = await fetchProducts({userId: userId, name: categoryName, page: pageNumber, selectedBrands: selectedFilters.selectedBrands, filters: {price: selectedFilters.selectedPrice}});

        if (response) {
            handleAddFilterOption('brands', response.brands);
            handleAddFilterOption('priceFilter', [response.minPrice, response.maxPrice]);

            setProductsCount(response.totalProductsCount || 0);
            setProducts(response.products);

            if(selectedFilters.price?.length === 0){
                setSelectedFilters(prev => ({...prev, price: [response.minPrice, response.maxPrice]}));
            }
        } else {
            console.error('Error fetching products: response is undefined');
        }
    }, [page, selectedFilters.selectedBrands, selectedFilters.selectedPrice, userStore.user]);

    useEffect(() => {
        fetchAndSetProducts({ categoryName: decodedCategoryName, page });
    }, [decodedCategoryName, page, fetchAndSetProducts]);

    return (
        <Grid container sx={{paddingX: "24px", maxWidth: "1570px", margin: "0 auto"}}>

            <Grid item xs={12}>
                <Box sx={{}}>
                    <Typography fontSize={36}>{decodedCategoryName}</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sx={(theme) => ({paddingY: "16px", borderBottom: "1px solid gray", position: "sticky", top: "60px", zIndex: "100", background: theme.palette.background.white })}>
                <Typography fontSize={16}>Знайдено товарів: {productsCount}</Typography>

                <Box sx={{display: "flex", gap: "10px"}}>
                    <Button variant="contained" color="primary" onClick={handleClearFilters}>
                        Clear filters
                    </Button>

                    {Object.keys(selectedFilters).map(filterType => {
                        if (filterType === 'selectedBrands') {
                            return selectedFilters[filterType].map((brand, index) => (
                                <Chip
                                    label={brand}
                                    key={index}
                                    variant="outlined"
                                    onDelete={() => handleDeleteFilterOption(filterType, brand)}
                                />
                            ));
                        } else if (filterType === 'selectedPrice') {
                            return selectedFilters[filterType].map((option, index) => {
                                return (
                                    <Chip
                                        label={`${option.join('-')}`}
                                        key={index}
                                        variant="outlined"
                                        onDelete={() => handleDeleteFilterOption(filterType, option)}
                                    />
                                );
                            });
                        }
                    })}
                </Box>
            </Grid>

            <Grid item xs={2.5}>
                <Box sx={{bgcolor: "#e7e7e7", height: "1000px", borderRight: "1px solid gray"}}>
                    <ProductsFilters 
                        selectedFilters={selectedFilters}
                        handleAddFilterOption={handleAddFilterOption}
                        handleDeleteFilterOption={handleDeleteFilterOption}
                        handleAppendFilterOption={handleAppendFilterOption}
                    />
                </Box>
            </Grid>

            <Grid item xs={9.5}>
                <ProductsList 
                    name={decodedCategoryName} 
                    page={page}
                    setPage={setPage}
                    products={products}
                    productsData={productsData}
                    fetchAndSetProducts={fetchAndSetProducts}
                />
            </Grid>
        </Grid>
    );
});

export default ProductsListPageContent;