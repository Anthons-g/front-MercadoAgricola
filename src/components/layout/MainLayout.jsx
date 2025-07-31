import React from 'react';
import { Box } from '@mui/material';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <Box sx={{ overflowX: 'hidden', width: '100%' }}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
