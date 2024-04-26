import React, { useState } from 'react';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { getCategoriesNameId } from '../../../../../http/categoryApi';
import { ListItem, ListItemText } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import { getSubCategoriesIcons, deleteImgSubCategory } from '../../../../../http/subCategoryApi';
import { deleteImage } from '../../../../../http/fireBaseStorageUploadApi';
import CategorySelectDialog from './CategorySelectDialog';

const ImageListItemWithButtons = ({ item, handleIconSelect, handleIconDelete}) => {
 
  return(
    <ImageListItem 
      key={item.id}
    >
      <img
        src={item.imgSrc}
        alt={item.imgName}
        loading="lazy"
        style={{ cursor: 'pointer'}}
      />
        <Box sx={{ position: 'absolute', bottom: 0 }}>
          <Button onClick={() => handleIconSelect(item)}>
            <Typography sx={{ color: "white", mixBlendMode: "difference" }}>Add</Typography>
          </Button>
          <Button onClick={() => handleIconDelete(item)}>
            <Typography sx={{ color: "white", mixBlendMode: "difference", zIndex: 100}}>Delete</Typography>
          </Button>
        </Box>
    </ImageListItem>
  );
}

const IconSelectDialog = ({ open, handleClose, handleIconSelect, handleIconDelete, icons }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select an Icon</DialogTitle>
      <DialogContent>
        <Box sx={{width: "100%", display: "flex", flexWrap: "wrap", gap: "15px"}}>
          {icons.map((item) => (
            <ImageListItemWithButtons 
              key={item.id}
              item={item}
              handleIconSelect={handleIconSelect}
              handleIconDelete={handleIconDelete}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const NewCategoryPopup = ({ open, handleClose, handleSave, newRecord, setNewRecord }) => {
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [iconDialogOpen, setIconDialogOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleSelectCategory = async () => {
    try {
      const response = await getCategoriesNameId();

      setData(response.data); 
      setCategoryDialogOpen(true);
    } catch (error) {
      console.error("Error fetching icons: ", error);        
    }
  };

  const handleItemSelect = (item) => {
    setNewRecord({ ...newRecord, subCategoryId: item.id });
    setCategoryDialogOpen(false);
  };



  const [dataIcons, setDataIcons] = useState([]);

  const handleSelectIcons = async () => {
    try {
      const response = await getSubCategoriesIcons();

      setDataIcons(response);
      setIconDialogOpen(true);
    } catch (error) {
      console.error("Error fetching icons: ", error);        
    }
  };

  const handleIconSelect = (icon) => {
    setNewRecord({ ...newRecord, icon });
    setIconDialogOpen(false);
  };
  const handleIconDelete = async (icon) => {
    const imagePath = 'subCategories/' + icon.imgName;
    await deleteImage(imagePath);

    await deleteImgSubCategory(icon.id);
    handleSelectIcons();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setNewRecord({ ...newRecord, icon: file });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New SubCategory</DialogTitle>
      <DialogContent>
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
          onChange={(e) => setNewRecord({ ...newRecord, nameOfSubCategory: e.target.value })}
        />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          Select category for subCategory
        </Typography>

        <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Button onClick={handleSelectCategory} variant="contained" >Select</Button>
        </Box>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          Select or add a new icon
        </Typography>

        <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Button onClick={handleSelectIcons} variant="contained" >Select</Button>

          <input 
            accept="image/svg+xml,image/jpeg,image/png"
            id="icon"
            type="file"
            onChange={handleFileSelect}
          />
        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>

      <CategorySelectDialog
        open={categoryDialogOpen}
        handleClose={() => setCategoryDialogOpen(false)}
        handleItemSelect={handleItemSelect}
        data={data}
      />

      <IconSelectDialog
        open={iconDialogOpen}
        handleClose={() => setIconDialogOpen(false)}
        handleIconSelect={handleIconSelect}
        handleIconDelete={handleIconDelete}
        icons={dataIcons}
      />
    </Dialog>
  );
};

export default NewCategoryPopup;