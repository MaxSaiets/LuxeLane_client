import React, { useState, useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography, Grid, Button, Chip, Modal, Divider} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../http/productsApi";
import ProductsFilters from "../ProductsList/ProductsFilters/ProductsFilters";
import ProductsList from "../ProductsList/ProductsList";

import { useContext } from "react";
import { RootStoreContext } from "../../store/RootStoreProvider";
 
import { useTheme, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductsListPageContent = observer(() => {
    const {userStore} = useContext(RootStoreContext);

    const { name } = useParams();
    const decodedCategoryName = decodeURIComponent(name).replace(/__/g, ', ').replace(/_/g, ' ');
    
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
   
    const theme = useTheme(); 
    const matches900 = useMediaQuery(theme.breakpoints.down('md'));
    const matches600 = useMediaQuery(theme.breakpoints.down('sm'));

    const [isModalOpen, setModalOpen] = useState(false);

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

        const response = await fetchProducts({ name: categoryName, page: pageNumber, selectedBrands: selectedFilters.selectedBrands, filters: {price: selectedFilters.selectedPrice}});

        if (response) {
            handleAddFilterOption('brands', response.brands);
            handleAddFilterOption('priceFilter', [response.minPrice, response.maxPrice]);

            setProductsCount(response.totalProductsCount || 0);
            setProducts(response.products);

            setPageCount(response.pageCount || 0);

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

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <Grid container sx={{ maxWidth: "1570px", margin: "0 auto", paddingBottom: matches600 ? "56px" : undefined}}>

            <Grid item xs={12} sx={{padding: matches600 ? "8px 8px 0px 8px" : "12px 12px 0px 12px", bgcolor: theme.palette.background.filterLeftBar}}>
                <Box sx={{}}>
                    <Typography fontSize={matches900 ? "22px" : "30px"}>{decodedCategoryName}</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sx={(theme) => ({ padding: matches900 ? "8px" : "16px", display: "flex", flexDirection: "column", gap: "5px", borderBottom: "1px solid gray", position: "sticky", top: matches600 ? "54px" : "60px", zIndex: 1000, bgcolor: theme.palette.background.filterLeftBar })}>
                <Typography fontSize={16}>Products found: {productsCount}</Typography>

                <Box sx={{display: "flex", gap: "10px", bgcolor: theme.palette.background.filterLeftBar}}>

                    {matches900 && (
                        <Button variant="contained" color="success" onClick={handleOpenModal}>
                            Filters
                        </Button>
                    )}
                    <Button variant="contained" color="primary" onClick={handleClearFilters}>
                        Clear filters
                    </Button>

                    {!matches900 && Object.keys(selectedFilters).map(filterType => {
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

            <Grid container>
                {!matches900 && (
                    <Grid item sx={{ width: "250px", bgcolor: theme.palette.background.filterLeftBar, height: "100%", borderRight: "1px solid gray", padding: "0px 16px 0px 16px" }}>
                        <ProductsFilters
                            selectedFilters={selectedFilters}
                            handleAddFilterOption={handleAddFilterOption}
                            handleDeleteFilterOption={handleDeleteFilterOption}
                            handleAppendFilterOption={handleAppendFilterOption}
                        />
                    </Grid>
                )}

                <Grid item sx={{ flex: 1, minHeight: "410px" }}>
                    <ProductsList
                        name={decodedCategoryName}
                        page={page}
                        pageCount={pageCount}
                        setPage={setPage}
                        products={products}
                        fetchAndSetProducts={fetchAndSetProducts}
                    />
                </Grid>

                {/* Modal for filters */}
                <Modal open={isModalOpen} onClose={handleCloseModal}>
                    <Box sx={{ width: "250px", height: "100%", bgcolor: "white", position: "fixed", top: 0, left: 0, padding: matches900 ? "8px" : "20px", boxShadow: 24, bgcolor: theme.palette.background.filterLeftBar }}>
                        
                        <Button 
                            onClick={handleCloseModal} 
                            variant="text" 
                            sx={{ 
                                margin: "10px 0px", 
                                textTransform: "none", 
                                color: "#000000", 
                                padding: 0,
                                minWidth: "auto",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <ArrowBackIcon sx={{ marginRight: "5px", fontSize: "20px", color: theme.palette.text.main }} />
                            <Typography variant="body1" sx={{ textAlign: "left", color: theme.palette.text.main }}>Фільтри</Typography>
                        </Button>

                        <Divider />
                    
                        <ProductsFilters
                            selectedFilters={selectedFilters}
                            handleAddFilterOption={handleAddFilterOption}
                            handleDeleteFilterOption={handleDeleteFilterOption}
                            handleAppendFilterOption={handleAppendFilterOption}
                        />
                    </Box>
                </Modal>
            </Grid>
        </Grid>
    );
});

export default ProductsListPageContent;