import React, { useState } from 'react';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import { deleteImgCategory, getCategoriesIcons } from '../../../../../http/categoryApi';


const ImageListItemWithButtons = ({ item, handleIconSelect, handleIconDelete}) => {
 
  return(
    <ImageListItem 
      key={item.id}
    >
      <img
        src={item.fileUrl}
        alt={item.fileName}
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
  const [iconDialogOpen, setIconDialogOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleSelectIcons = async () => {
    try {
      const response = await getCategoriesIcons();

      setData(response.data);
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
    await deleteImgCategory(icon.id);
    handleSelectIcons();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setNewRecord({ ...newRecord, icon: file });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Category</DialogTitle>
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
          value={newRecord.nameOfCategory}
          onChange={(e) => setNewRecord({ ...newRecord, nameOfCategory: e.target.value })}
        />
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
      <IconSelectDialog
        open={iconDialogOpen}
        handleClose={() => setIconDialogOpen(false)}
        handleIconSelect={handleIconSelect}
        handleIconDelete={handleIconDelete}
        icons={data}
      />
    </Dialog>
  );
};

export default NewCategoryPopup;