import React, { useEffect, useState } from 'react';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { updateType } from '../../../../../http/typeApi';

const EditTypePopup = ({ setModalForEditIsOpen, modalForEditIsOpen, currentRow, updateData, setRows}) => {
    const [newData, setNewData] = useState();

    useEffect(() => {
        setNewData(currentRow);
    }, [currentRow]);

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
          brandId: currentRow.id,
        };

        if (newData.name !== currentRow.name) {
          data.name = newData.name;
        }

        try {
          await updateType(currentRow.id, data);

          const updatedData = await updateData();
          setRows(updatedData);

        } catch (error) {
            console.error("Error handleSave: ", error.message);
        }

        setModalForEditIsOpen(false);
    }
    
  return (
    <Dialog open={modalForEditIsOpen} onClose={handleClose}>
      <DialogTitle>Edit Type</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTypePopup;