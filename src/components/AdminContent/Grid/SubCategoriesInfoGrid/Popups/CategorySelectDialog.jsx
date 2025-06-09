import React from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, ListItemText } from "@mui/material";

const CategorySelectDialog = ({ open, handleClose, handleItemSelect, data }) => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select category for subCategory</DialogTitle>
        <DialogContent>
          <Box sx={{width: "100%", display: "flex", flexWrap: "wrap", gap: "15px"}}>
          {data && data.map((item) => (
            <ListItem button key={item.id} onClick={() => handleItemSelect(item)}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
};

export default CategorySelectDialog;