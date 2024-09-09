import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

import { fetchCategoriesData } from '../../../http/categoryApi';
import { fetchSubCategories } from '../../../http/subCategoryApi';

import CategoriesInfoGrid from '../Grid/CategoriesInfoGrid/CategoriesInfoGrid';
import SubCategoriesInfoGrid from '../Grid/SubCategoriesInfoGrid/SubCategoriesInfoGrid';

const CategoriesInfo = () => {
  const [dataCategories, setDataCategories] = useState([]);
  const [dataSubCategories, setDataSubCategories] = useState([]);

  const loadCategoriesData = async () => {
    const categoriesData = await fetchCategoriesData();
    // setDataCategories(categoriesData);
    return categoriesData;
  };

  const loadSubCategoriesData = async () => {
    const subCategoriesData = await fetchSubCategories();
    // setDataSubCategories(subCategoriesData);
    return subCategoriesData;
  };

  useEffect(() => {
    loadCategoriesData();
    loadSubCategoriesData();
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        CATEGORIES
        <CategoriesInfoGrid data={dataCategories} updateData={loadCategoriesData} />
      </Grid>

      <Grid item xs={12}>
        SUBCATEGORIES
        <SubCategoriesInfoGrid data={dataSubCategories} updateData={loadSubCategoriesData} />
      </Grid>
    </Grid>
  );
}

export default CategoriesInfo;
