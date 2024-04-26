import React, { useEffect, useState } from 'react';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { deleteImage, uploadImage } from '../../../../../http/fireBaseStorageUploadApi';
import { updateCategory } from '../../../../../http/categoryApi';

const EditCategoryPopup = ({ setModalForEditIsOpen, modalForEditIsOpen, currentRow, updateData, setRows}) => {
    const [newData, setNewData] = useState();
    const [previewImg, setPreviewImg] = useState();

    useEffect(() => {
        setNewData(currentRow);
    }, [currentRow]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setNewData({ ...newData, icon: file });

        const previewURL = URL.createObjectURL(file);
        setPreviewImg(previewURL);
    };

    const handleClose = () => {
        setModalForEditIsOpen(false);
    }

    const handleSave = async (event) => {
        event.preventDefault();

        if (JSON.stringify(currentRow) === JSON.stringify(newData)) {
            console.log("No changes made");
            return;
        }

        const data = {
            categoryId: currentRow.id,
            existingImageId: currentRow.images[0].id,
        };

        if (newData.name !== currentRow.name) {
            data.name = newData.name;
        }

        try {
            if (newData.icon){
                await deleteImage('categories/' + currentRow.images[0].imgName);
                const { name, url} = await uploadImage(newData.icon, 'categories/');
                data.imageName = name;
                data.imageUrl = url;
            }

            await updateCategory(currentRow.id, data);

            const updatedData = await updateData();
            setRows(updatedData);

        } catch (error) {
            console.error("Error handleSave: ", error.message);
        }

        setModalForEditIsOpen(false);
    }
    
  return (
    <Dialog open={modalForEditIsOpen} onClose={handleClose}>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Current information below:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={newData ? newData.name : ''}
          onChange={(e) => setNewData({ ...newData, name: e.target.value })}
        />
        
        <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                Icon
            </Typography>

            <img
                src={previewImg ? previewImg : newData?.images[0].imgSrc}
                alt={""}
                style={{ width: "50px", height: "50px", cursor: 'pointer'}}
            />
        </Box>

        <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                Change icon for category
            </Typography>
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
    </Dialog>
  );
};

export default EditCategoryPopup;