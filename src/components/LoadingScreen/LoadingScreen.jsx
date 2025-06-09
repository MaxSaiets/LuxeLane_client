import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingScreen = ({text="Loading..."}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {text}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;