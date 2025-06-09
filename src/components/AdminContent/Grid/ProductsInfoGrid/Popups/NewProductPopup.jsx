import React, { useState } from 'react';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { getCategoriesNameId } from '../../../../../http/categoryApi';
import { fetchSubCategories } from '../../../../../http/subCategoryApi';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { fetchBrands } from '../../../../../http/brandApi';
import { fetchTypes } from '../../../../../http/typeApi';

import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel';


const SelectDialogText = ({ open, handleClose, data, handleAddItems}) => {
  const [selectedIndices, setSelectedIndices] = useState([]);

  const handleListItemClick = (event, index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handleSave = () => {
    const selectedData = selectedIndices.map(index => data[index]);
    handleAddItems(selectedData);
    
    setSelectedIndices([]);

    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select item</DialogTitle>
      <DialogContent>
        <List sx={{width: "100%", display: "flex", flexDirection: "column", flexWrap: "wrap", gap: "15px"}}>
          {data ? (
            data.map((item, index) => (
              <ListItemButton
                key={item.id}
                selected={selectedIndices.includes(index)}
                onClick={(event) => handleListItemClick(event, index)}
                sx={{color: selectedIndices.includes(index) ? 'green' : 'inherit' }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))) : (
            <Typography>Data is empty</Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};


const NewProductPopup = ({ open, handleClose, handleSave, newRecord, setNewRecord }) => {
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
  const [data, setData] = useState([]);

  const [typeData, setTypeData] = useState("");
  
  const [additionalImages, setAdditionalImages] = useState([]);

  const saveProduct = () => {
    handleSave();
    setAdditionalImages([]);
  }

  const handleAdditionalImagesSelect = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages(files);
    setNewRecord({ ...newRecord, additionalImages: files });
  };

  const handleAddItems = (data) => {
    setNewRecord(prevRecord => ({
      ...prevRecord,
      [typeData]: data
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    // setAdditionalImages([file, ...additionalImages]);
    // setNewRecord({ ...newRecord, previewImage: file, additionalImages: additionalImages });
    setNewRecord({ ...newRecord, previewImage: file});
  };

  const handleSelectCategories = async (e) => {
    try {
      const response = await getCategoriesNameId();
      setData(response.data);

      setTypeData("categories");
      setSelectDialogOpen(true);
    } catch (error) {
      console.error("Error fetching icons: ", error);        
    }
  };
  
  const handleSelectSubCategories = async(e) => {
    try {
      const response = await fetchSubCategories();

      setData(response);

      setTypeData("subCategories");
      setSelectDialogOpen(true);
    } catch (error) {
      console.error("Error fetching icons: ", error);        
    }  };
  
  const handleSelectBrands = async (e) => {
    try {
      const response = await fetchBrands();
      setData(response);

      setTypeData("brands");
      setSelectDialogOpen(true);
    } catch (error) {
      console.error("Error fetching icons: ", error);        
    }  };
  
  const handleSelectTypes = async (e) => {
    try {
      const response = await fetchTypes();
      setData(response);

      setTypeData("types");
      setSelectDialogOpen(true);
    } catch (error) {
      console.error("Error fetching icons: ", error);        
    }  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DialogContentText>
              Please fill the information below:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={newRecord.nameOfSubCategory}
              onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
            />

            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Price"
              type="text"
              fullWidth
              value={newRecord.nameOfSubCategory}
              onChange={(e) => setNewRecord({ ...newRecord, price: e.target.value })}
            />


            <Box sx={{ display: "flex", gap: "15px", flexDirection: "column" }}>
              <Button onClick={handleSelectCategories} variant="contained">Select categories</Button>
              <Button onClick={handleSelectSubCategories} variant="contained">Select subCategories</Button>
              <Button onClick={handleSelectBrands} variant="contained">Select brands</Button>
              <Button onClick={handleSelectTypes} variant="contained">Select types</Button>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Add preview image:
            </Typography>

            <Box sx={{ display: "flex", gap: "15px", alignItems: "center", marginY: "15px"}}>
              <input 
                accept="image/svg+xml,image/jpeg,image/png"
                id="icon"
                type="file"
                onChange={handleFileSelect}
              />
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Add more images:
            </Typography>

            <Box sx={{ display: "flex", gap: "15px", alignItems: "center", marginY: "15px"}}>
              <input 
                accept="image/svg+xml,image/jpeg,image/png"
                id="additional-images"
                type="file"
                multiple
                onChange={handleAdditionalImagesSelect}
              />
            </Box>

          </Grid>

          <Grid item xs={12} md={6}>

            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Selected name:
            </Typography>
            {newRecord.title && (
              <Typography>{newRecord.title}</Typography>
            )}

            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Selected price:
            </Typography>
            {newRecord.price && (
              <Typography>{newRecord.price}</Typography>
            )}

            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Selected categories:
            </Typography>
            {newRecord.categories && newRecord.categories.map((category, index) => (
              <Typography key={index}>{category.name}</Typography>
            ))}

            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Selected subCategories:
            </Typography>
            {newRecord.subCategories && newRecord.subCategories.map((subCategory, index) => (
              <Typography key={index}>{subCategory.name}</Typography>
            ))}

            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Selected brands:
            </Typography>
            {newRecord.brands && newRecord.brands.map((brand, index) => (
              <Typography key={index}>{brand.name}</Typography>
            ))}
            
            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Selected types:
            </Typography>
            {newRecord.types && newRecord.types.map((type, index) => (
              <Typography key={index}>{type.name}</Typography>
            ))}

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Selected image preview:
            </Typography>
            {newRecord.previewImage && (
              <img 
                src={URL.createObjectURL(newRecord.previewImage)} 
                alt="" 
                style={{ 
                  width: '150px', 
                  height: '150px', 
                  objectFit: 'cover' 
                }}
              />
            )}

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Selected images:
            </Typography>

            <Carousel>
              {additionalImages.map((img, index) => (
                <img 
                  key={index} 
                  src={URL.createObjectURL(img)} 
                  alt="" 
                  style={{ 
                    width: '150px', 
                    height: '150px', 
                    objectFit: 'cover' 
                  }}
                />          
              ))}
            </Carousel>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={saveProduct}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>

      <SelectDialogText
        open={selectDialogOpen}
        handleAddItems={handleAddItems}
        handleClose={() => setSelectDialogOpen(false)}
        data={data}
        newRecord={newRecord}
      />
    </Dialog>
  );
};

export default NewProductPopup;