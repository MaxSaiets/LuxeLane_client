import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import TypesInfoGrid from '../Grid/TypesInfoGrid/TypesInfoGrid';
import { fetchTypes } from '../../../http/typeApi';

const BrandsInfo = () => {
  const [dataTypes, setDataTypes] = useState([]);

  useEffect(() => {
    // Types
    fetchTypes().then(data => setDataTypes(data));
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sx={{marginTop: 2}}>
        Types
        <TypesInfoGrid data={dataTypes} updateData={fetchTypes} />
      </Grid>
    </Grid>
  );
}

export default BrandsInfo;