import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const QuantitySelector = ({data, updateQuantity}) => {
  const [quantity, setQuantity] = useState(data.quantity);

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    updateQuantity({productId: data.id, quantity: quantity + 1});
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      updateQuantity({productId: data.id, quantity: quantity - 1});
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={handleDecrease} disabled={quantity <= 1}>
        <RemoveIcon />
      </IconButton>
      <Box
        sx={{
          minWidth: 40,
          textAlign: 'center',
          border: '1px solid #ddd',
          borderRadius: 1,
          mx: 1,
          p: 0.5
        }}
      >
        <Typography variant="body1">{quantity}</Typography>
      </Box>
      <IconButton onClick={handleIncrease}>
        <AddIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;