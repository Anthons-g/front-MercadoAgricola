import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3">
        Bienvenido al Mercado Agrícola
      </Typography>
      <Typography variant="body1">
        Esta plataforma te permite comprar y vender frutas, verduras, ganado, semillas, y productos agrícolas de forma accesible, segura y moderna.
      </Typography>
    </Container>
  );
}
