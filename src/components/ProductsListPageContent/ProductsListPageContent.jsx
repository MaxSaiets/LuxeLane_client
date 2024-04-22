import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { Box, Typography, Grid } from "@mui/material";
import Slider from '@mui/material/Slider';

import { useParams, useNavigate } from "react-router-dom";

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProductsList from "../ProductsList/ProductsList";

const ProductsListPageContent = observer(() => {
    const { name } = useParams();
    const decodedCategoryName = decodeURIComponent(name).replace(/__/g, ', ').replace(/_/g, ' ');


    return (
        <Grid container sx={{paddingX: "24px"}}>

            <Grid item xs={12}>
                <Box>
                    <ProductsList name={decodedCategoryName} />
                </Box>
            </Grid>
        </Grid>
    );
});

export default ProductsListPageContent;