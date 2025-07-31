import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function ControlNivelVisual({ label, state, setState }) {
  const niveles = ['normal', 'medio', 'alto'];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {niveles.map(nivel => (
          <Button
            key={nivel}
            onClick={() => setState(nivel)}
            variant={state === nivel ? 'contained' : 'outlined'}
            sx={{
              borderRadius: 5,
              textTransform: 'capitalize',
              fontSize: '0.75rem',
              px: 2
            }}
          >
            {nivel}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
