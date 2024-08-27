import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AllUsersInfoGrid from '../Grid/AllUsersInfoGrid/AllUsersInfoGrid';
import ColumnChart from '../Charts/ColumnChart/ColumnChart';
import { Grid } from '@mui/material';

import { fetchProducts} from '../../../http/productApi';

import ProductsInfoGrid from '../Grid/ProductsInfoGrid/ProductsInfoGrid';

const ProductsInfo = () => {
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    // Products
    fetchProducts().then(data => setDataProducts(data));
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sx={{marginTop: 2}}>
        PRODUCTS
        <ProductsInfoGrid data={dataProducts} updateData={fetchProducts} />
      </Grid>

    </Grid>
  );
}

export default ProductsInfo;