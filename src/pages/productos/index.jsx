import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ProductoCard from '../../components/productos/ProductoCard';

const productosAgricolas = [
  {
    id: 1,
    nombre: 'Fertilizante NPK',
    categoria: 'Agrícola',
    descripcion: 'Mejora el rendimiento y estructura del suelo.',
    imagen: '/imagenes/productos/fertilizante.webp'
  },
  {
    id: 2,
    nombre: 'Insecticida Biológico',
    categoria: 'Agrícola',
    descripcion: 'Control de plagas sin afectar polinizadores.',
    imagen: '/imagenes/productos/insecticida.webp'
  },
  {
    id: 3,
    nombre: 'Herramienta Multiuso',
    categoria: 'Agrícola',
    descripcion: 'Ideal para cultivo intensivo y riego.',
    imagen: '/imagenes/productos/herramienta.webp'
  }
];

export default function Agricola() {
  return (
    <Box sx={{ px: 4, py: 6, mt: 8, maxWidth: '1080px', mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }} align="center">
        🌾 Productos Agrícolas
      </Typography>

      <Grid container spacing={4}>
        {productosAgricolas.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <ProductoCard producto={producto} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
