import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { Box, Typography, Grid, MenuItem, Button, Checkbox, FormControlLabel, TextField, Divider } from "@mui/material";
import Slider from '@mui/material/Slider';
import { set } from "mobx";

const ProductsFilters = observer(({ filters, productsData, setFilters, selectedBrands, setSelectedBrands, priceFilter, setPriceFilter}) => {

    const handlePriceChange = (event, newValue) => { 
        setPriceFilter(newValue);
    };

    const handlePriceChangeText = (event, index) => {
        const newValue = Number(event.target.value);
        const newPriceFilter = [...priceFilter];
        newPriceFilter[index] = newValue;
        setPriceFilter(newPriceFilter);
    };

    const handlePriceConfirm = useCallback(() => { 
        const newFilters = { ...filters, price: {between: priceFilter}};
        setFilters(newFilters);
    }, [priceFilter, filters]);
    
    const handleBrandChange = useCallback((event) => {
        if (event.target.checked) {
            setSelectedBrands(prevBrands => [...prevBrands, event.target.name]);
        } else {
            setSelectedBrands(prevBrands => prevBrands.filter(brand => brand !== event.target.name));
        }

        // const newFilters = { ...filters, selectedBrands };
        // setFilters(newFilters);
    }, [setSelectedBrands, selectedBrands, filters]);

    const handleClearFilters = useCallback(() => {
        const filters = {};
        setSelectedBrands([]);
        setPriceFilter([]);
        setFilters(filters);
    }, [setFilters]);

    return (
        <Box sx={{ "& > *": { borderBottom: "1px solid #000", padding: "12px"}}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: "15px"}}>

                <Typography>Ціна:</Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: "flex", gap: "5px", alignItems: "center"}}>
                        <TextField 
                            variant="outlined" 
                            size="small" 
                            value={priceFilter[0] || ""} 
                            InputProps={{ 
                                onChange: (e) => handlePriceChangeText(e, 0),
                                readOnly: false,
                                inputProps: { 
                                    style: { padding: "6px", width: "100%" },
                                    type: "number",
                                },
                            }} 
                        />
                        <Typography>-</Typography>
                        <TextField 
                            variant="outlined" 
                            size="small" 
                            value={priceFilter[1] || ""} 
                            InputProps={{ 
                                onChange: (e) => handlePriceChangeText(e, 1),
                                readOnly: false,
                                inputProps: { 
                                    style: { padding: "6px", width: "100%" },
                                    type: "number",
                                }
                            }} 
                        />
                    </Box>

                    <Button variant="contained" color="success" onClick={handlePriceConfirm} sx={{minWidth: "auto"}}>
                        OK
                    </Button>
                </Box>

                <Slider
                    value={priceFilter}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={productsData.minPrice}
                    max={productsData.maxPrice}  
                    sx={{
                        "& .MuiSlider-rail": {
                            bgcolor: 'green',
                        },
                        "& .MuiSlider-track": {
                            bgcolor: 'green',
                        },
                    }}
                />
            </Box>

            <Box>
                <Typography>Бренд:</Typography>
                <Grid container direction="column">
                    {Object.entries(productsData.brands).map(([brandName, count]) => (
                        <Grid item key={brandName}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedBrands.includes(brandName)}
                                        onChange={handleBrandChange}
                                        name={brandName}
                                    />
                                }
                                label={`${brandName} (${count})`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        
            <Box>
                <Button variant="contained" color="primary" onClick={handleClearFilters}>
                    Clear filters
                </Button>
            </Box>
        </Box>
    );
});

export default ProductsFilters;