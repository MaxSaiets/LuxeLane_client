import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AllUsersInfoGrid from '../Grid/AllUsersInfoGrid/AllUsersInfoGrid';
import ColumnChart from '../Charts/ColumnChart/ColumnChart';
import { Grid } from '@mui/material';

import { fetchCategories } from '../../../http/categoryApi';
import { fetchSubCategories } from '../../../http/subCategoryApi';

import CategoriesInfoGrid from '../Grid/CategoriesInfoGrid/CategoriesInfoGrid';
import SubCategoriesInfoGrid from '../Grid/SubCategoriesInfoGrid/SubCategoriesInfoGrid';

const CategoriesInfo = () => {
  const [dataCategories, setDataCategories] = useState([]);
  const [dataSubCategories, setDataSubCategories] = useState([]);

  useEffect(() => {
    // Categories
    fetchCategories().then(data => setDataCategories(data));

    // Subcategories
    fetchSubCategories().then(data => setDataSubCategories(data));
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sx={{marginTop: 2}}>
        CATEGORIES
        <CategoriesInfoGrid data={dataCategories} updateData={fetchCategories} />
      </Grid>

      <Grid item xs={12}>
        SUBCATEGORIES
        <SubCategoriesInfoGrid data={dataSubCategories} updateData={fetchSubCategories} />
      </Grid>
    </Grid>
  );
}

export default CategoriesInfo;