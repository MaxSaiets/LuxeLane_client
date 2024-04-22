import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import BrandsInfoGrid from '../Grid/BrandsInfoGrid/BrandsInfoGrid';
import { fetchBrands } from '../../../http/brandApi';

const BrandsInfo = () => {
  const [dataBrands, setDataBrand] = useState([]);

  useEffect(() => {
    // Brands
    fetchBrands().then(data => setDataBrand(data));
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sx={{marginTop: 2}}>
        Brands
        <BrandsInfoGrid data={dataBrands} updateData={fetchBrands} />
      </Grid>
    </Grid>
  );
}

export default BrandsInfo;