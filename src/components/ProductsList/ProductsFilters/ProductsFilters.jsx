import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { Box, Typography, Grid, MenuItem, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import Slider from '@mui/material/Slider';

const ProductsFilters = observer(({selectedFilters, handleAddFilterOption, handleDeleteFilterOption, handleAppendFilterOption}) => {
    const [priceFilter, setPriceFilter] = useState([]);

    useEffect(() => {
        const { selectedPrice, priceFilter } = selectedFilters;
        setPriceFilter(selectedPrice && selectedPrice.length > 0 ? selectedPrice[0] : priceFilter ? priceFilter[0] : [0, 0]);
    }, [selectedFilters]);

    const handlePriceChange = (event, newValue) => { 
        setPriceFilter(newValue);
    };

    const handlePriceChangeText = (event, index) => {
        const newValue = Number(event.target.value);
        const newPriceFilter = [...priceFilter];
        newPriceFilter[index] = newValue;
        setPriceFilter(newPriceFilter);
    };

    const handlePriceConfirm = () => {
        handleAddFilterOption('selectedPrice', priceFilter);
    };
    
    const handleBrandChange = (event) => {
        if (event.target.checked) {
            handleAppendFilterOption('selectedBrands', event.target.name);
        } else {
            handleDeleteFilterOption('selectedBrands', event.target.name);
        }
    };

    return (
        <Box sx={{ "& > *": { borderBottom: "1px solid #000", padding: "12px"}}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: "15px"}}>

                <Typography>Price:</Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: "flex", gap: "5px", alignItems: "center"}}>
                        <TextField 
                            variant="outlined" 
                            size="small" 
                            value={priceFilter[0] ? priceFilter[0] : ""} 
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
                            value={priceFilter[1] ? priceFilter[1] : ""} 
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
                    value={priceFilter.length === 2 ? priceFilter : [0, 0]}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={selectedFilters?.priceFilter ? selectedFilters?.priceFilter[0][0] : 0}
                    max={selectedFilters?.priceFilter ? selectedFilters?.priceFilter[0][1] : 0}
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
                <Typography>Brand:</Typography>
                
                <Grid container direction="column">
                    {selectedFilters.brands && selectedFilters.brands.map((brand, index) => {
                        return Object.entries(brand).map(([brandName, count]) => (
                            <Grid item key={`${index}-${brandName}`}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedFilters?.selectedBrands?.includes(brandName) || false}
                                            onChange={handleBrandChange}
                                            name={brandName}
                                        />
                                    }
                                    label={`${brandName} (${count})`}
                                />
                            </Grid>
                        ));
                    })}
                </Grid>
            </Box>
        </Box>
    );
});

export default ProductsFilters;