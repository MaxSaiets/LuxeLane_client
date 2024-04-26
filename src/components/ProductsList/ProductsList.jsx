import React, { useContext, useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";

import { Box, Grid, Card, CardMedia, CardContent, Typography, useMediaQuery } from '@mui/material';
import Chip from '@mui/material/Chip';

import { useMode } from "../../theme";
import { useParams, useNavigate } from "react-router-dom";

import { PAGE404_ROUTE } from "../../utils/consts";

import SliderSlick from "../MainContent/Slider/SliderSlick";
import { getCategoryTypes } from "../../http/typeApi";

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { fetchProducts } from "../../http/productsApi";

import ProductsFilters from "./ProductsFilters/ProductsFilters";

import LazyLoad from 'react-lazyload';
import ProductCard from "../ProductCard/ProductCard";

const ProductsList = observer( ({ name }) => {
    const [productsData, setProductsData] = useState({minPrice: 0, maxPrice: 0, brands: []} );
    
    const [products, setProducts] = useState([]);
    const [numberOfProducts, setNumberOfProducts] = useState(0);

    const [page, setPage] = useState(1);
    
    const [priceFilter, setPriceFilter] = useState([]);

    const [filters, setFilters] = useState({});
    const [selectedBrands, setSelectedBrands] = useState([]);
      
    const handleChange = (event, pageNumber) => {
        setPage(pageNumber);

        fetchAndSetProducts(name, pageNumber);
    };

    const fetchAndSetProducts = useCallback(async (options) => {
        const { categoryName = name, pageNumber = page } = options;
        const response = await fetchProducts({name: categoryName, page: pageNumber, selectedBrands, filters});
        
        setNumberOfProducts(response.totalProductsCount)
        setProducts(response.products);
    
        setProductsData({minPrice: response.minPrice, maxPrice: response.maxPrice, brands: response.brands, pageCount: response.pageCount});

        if(priceFilter.length === 0){
            setPriceFilter([response.minPrice, response.maxPrice]);
        }

    }, [name, page, selectedBrands, filters]);

    useEffect(() => {
        fetchAndSetProducts({name, page, selectedBrands, filters});
    }, [fetchAndSetProducts]); 

    return (
        <Grid container>

            <Grid item xs={12}>
                <Box sx={{}}>
                    <Typography fontSize={36}>{name}</Typography>
                </Box>

                <Box sx={{paddingY: "16px", borderBottom: "1px solid gray"}}>
                    <Typography fontSize={16}>Знайдено товарів: {numberOfProducts}</Typography>
                </Box>

            </Grid>

            <Grid item xs={2.5}>

                <Box sx={{bgcolor: "#e7e7e7", height: "1000px", borderRight: "1px solid gray"}}>
                    <ProductsFilters 
                        fetchAndSetProducts={fetchAndSetProducts} 
                        productsData={productsData} 
                        filters={filters}
                        setFilters={setFilters}
                        selectedBrands={selectedBrands}
                        setSelectedBrands={setSelectedBrands}
                        priceFilter={priceFilter}
                        setPriceFilter={setPriceFilter}
                    />
                </Box>

            </Grid>

            <Grid item xs={9.5}>
                <Grid container >
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))
                    ) : (
                        <Typography variant="h6">
                            Nothing was found for your query, try changing your query.
                        </Typography>
                    )}
                </Grid>    

                <Box sx={{ borderBottom: "1px solid gray"}}>
                    <Stack spacing={2} sx={{alignItems: "center"}}>
                        <Typography>Page: {page}</Typography>
                        <Pagination count={productsData.pageCount} page={page} onChange={handleChange} />
                    </Stack>
                </Box>
            </Grid>

        </Grid>
    );
});

export default ProductsList;