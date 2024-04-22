import React, { useState } from 'react';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';

const NewTypePopup = ({ open, handleClose, handleSave, newRecord, setNewRecord }) => {

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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTypePopup;