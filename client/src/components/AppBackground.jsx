import React from 'react';
import Box from '@mui/material/Box';
import bgImage from './background.png'; // Import image from the same folder

export default function AppBackground() {
  return (
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      {/* The actual image */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${bgImage})`, // Use the imported image variable
        backgroundSize: 'cover',
        backgroundPosition: 'center top', // Keeps the sunset/mountains visible
      }} />
      
      {/* Dark overlay + Blur for readability */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        bgcolor: 'rgba(0, 0, 0, 0.55)', // Darkens just enough
        backdropFilter: 'blur(3px)',      // Softens the image behind text
      }} />
    </Box>
  );
}