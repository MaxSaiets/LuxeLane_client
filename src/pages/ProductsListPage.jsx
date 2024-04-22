import React from "react";

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MAIN_ROUTE } from "../utils/consts";

import { Box, Typography } from '@mui/material';
import ProductsListPageContent from "../components/ProductsListPageContent/ProductsListPageContent";

const ProductsListPage = () => {
    return (
        <ProductsListPageContent />
    );
};

export default ProductsListPage;