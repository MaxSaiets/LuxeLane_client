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

import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import ProductsFilters from "./ProductsFilters/ProductsFilters";

import LazyLoad from 'react-lazyload';

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

const ProductCard = ({product}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const discountPercentage = product.discount ? ((1 - product.discount / product.price) * 100).toFixed(0) : null;

    const handleMouseEnter = () => {
        setIsHovered(true);
        setImageIndex(1);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setImageIndex(0);
    };
    
    return(
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{minHeight: "100%", borderRight: "1px solid gray", borderBottom: "1px solid gray", position: "relative", }}>
            
            <Card
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    position: isHovered ? "absolute" : "relative",
                    top: 0,
                    left: 0,

                transform: isHovered ? "scale(1.05)" : "scale(1)",
                transformOrigin: 'center top',
                transition: "transform 0.3s ease-in-out",
                boxShadow: isHovered ? "5px 5px 15px rgba(0,0,0,0.3)" : "none",
                padding: "16px",
                minHeight: "400px",
                zIndex: isHovered ? 100 : 0,

            }}
            >
                <CardContent sx={{padding: 0}}>
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Box sx={{paddingTop: "5px"}}>
                            {discountPercentage && <Chip label={`-${discountPercentage}%`} variant="filled" color="error" size="small" sx={{fontSize: "12px", fontWeight: "700"}} />}
                        </Box>

                        <Box sx={{justifyContent: "flex-end", display: "flex", flexDirection: "column", gap: "10px"}}>
                            <IconButton aria-label="add to favorites">
                                <FavoriteBorderIcon color="info" />
                            </IconButton>
                        </Box>
                    </Box>
                </CardContent>

                <MuiLink component={RouterLink} underline='none' color="#000000" to={"/"}>
                    <LazyLoad once>
                        <img
                            height="194"
                            src={product.images[imageIndex].imgSrc}
                            alt={product.title}
                            style={{objectFit: "contain", paddingTop: "10px", margin: "0 auto", display: "block", width: "100%"}}
                        />
                    </LazyLoad>
                </MuiLink>

                <Box sx={{paddingTop: "20px"}}>

                    <MuiLink component={RouterLink} underline='none' color="#000000" to={""} onClick={() => console.log("Sdfsdfhsjdf", product)}>
                        <Typography color="text.main" sx={{fontSize: "14px"}}>
                            {product.title}
                        </Typography>
                    </MuiLink>

                    <Typography color="text.secondary" sx={{fontSize: "14px", textDecoration: "line-through"}}>
                        {product?.discount && `${product.discount}₴`}
                    </Typography>

                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography color="text.secondary" sx={{fontSize: "24px", color: "red"}}>
                            {product.price}₴
                        </Typography>

                        <Box>
                            <IconButton aria-label="add to basket">
                                <AddShoppingCartIcon color="info" />
                            </IconButton>
                        </Box>
                    </Box>

                    {isHovered && (
                        <Typography variant="h6" color="text.secondary">
                            More information about the product...
                            <br />
                            Under development...
                        </Typography>
                    )}

                </Box>
            </Card>
        </Grid>
    )
};

export default ProductsList;