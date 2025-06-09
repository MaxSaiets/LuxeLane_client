import React, { useState } from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, ListItemText } from "@mui/material";

const SubCategorySelectDialog = ({ open, handleClose, handleSaveSubCategories, data }) => {
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const handleItemSelect = (item) => {
    setSelectedSubCategories((prevSelected) => {
      if (prevSelected.find(subCat => subCat.id === item.id)) {
        return prevSelected.filter((subCat) => subCat.id !== item.id);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const handleSave = () => {
    const selectedIds = selectedSubCategories.map(subCat => subCat.id).filter(id => id !== undefined);
    handleSaveSubCategories(selectedIds);
    handleClose();
  };

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select subCategories for type</DialogTitle>
        <DialogContent>
          <Box sx={{width: "100%", display: "flex", flexWrap: "wrap", gap: "15px"}}>
          {data && data.map((item) => (
            <ListItem button
              key={item.id}
              onClick={() => handleItemSelect(item)}
              sx={{
                backgroundColor: selectedSubCategories.some(subCat => subCat.id === item.id) ? 'green' : 'inherit',
                color: selectedSubCategories.some(subCat => subCat.id === item.id) ? 'white' : 'inherit',
                '&:hover': {
                  backgroundColor: selectedSubCategories.some(subCat => subCat.id === item.id) ? 'darkgreen' : 'lightgray',
                }
              }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
};

export default SubCategorySelectDialog;