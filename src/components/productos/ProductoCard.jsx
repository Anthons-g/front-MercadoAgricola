import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

export default function ProductoCard({ producto }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: 360, 
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* Imagen */}
      <Box
        sx={{
          height: 180,
          position: 'relative',
          backgroundColor: '#f9f9f9',
        }}
      >
        {producto.destacado && (
          <Chip
            label={producto.destacado}
            color="success"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              fontWeight: 'bold',
              zIndex: 1,
            }}
          />
        )}
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            objectFit: 'contain'
          }}
        />
      </Box>

      {/* Info textual */}
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          noWrap
          sx={{ fontWeight: 600, color: '#212121', mb: 0.5 }}
        >
          {producto.nombre}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#757575',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {producto.descripcion}
        </Typography>
      </Box>
    </Box>
  );
}
