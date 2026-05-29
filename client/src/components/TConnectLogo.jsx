import React from 'react';
import Box from '@mui/material/Box';
import logo from './TConnect2.png'; // Vite automatically handles image imports from src

export default function TConnectLogo({ size = 40 }) {
  return (
    <Box
      component="img"
      src={logo}
      alt="T-Connect Logo"
      sx={{
        height: size,
        width: 'auto',
        objectFit: 'contain',
        display: 'block'
      }}
    />
  );
}