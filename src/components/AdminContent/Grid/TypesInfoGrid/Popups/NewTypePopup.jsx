import React, { useState } from 'react';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select, ListItem, ListItemText } from '@mui/material';
import SubCategorySelectDialog from './SubCategorySelectDialog';

const NewTypePopup = ({ open, handleClose, handleSave, newRecord, setNewRecord, subCategories }) => {
  const [subCategoryDialogOpen, setSubCategoryDialogOpen] = useState(false);

  const handleSubCategoriesSelect = (subCategoriesList) => {
    setNewRecord({ ...newRecord, subCategories: subCategoriesList });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New type</DialogTitle>
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
          onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
        />

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          Select subCategories for type
        </Typography>

        <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Button onClick={() => setSubCategoryDialogOpen(prev => !prev)} variant="contained" >Select</Button>
        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>

      <SubCategorySelectDialog
        open={subCategoryDialogOpen}
        handleClose={() => setSubCategoryDialogOpen(false)}
        handleSaveSubCategories={handleSubCategoriesSelect}
        data={subCategories}
      />

    </Dialog>
  );
};

export default NewTypePopup;