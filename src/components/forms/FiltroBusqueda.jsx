import React, { useState } from 'react';
import {
  Container, Box, Typography, TextField, Select, MenuItem, InputLabel, FormControl,
  Button, Grid
} from '@mui/material';

export default function FiltroBusqueda({ onBuscar }) {
  const [filtros, setFiltros] = useState({
    categoria: '',
    nombre: '',
    precioMin: '',
    precioMax: ''
  });

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const aplicarFiltros = () => {
    console.log('Aplicando filtros:', filtros);
    if (onBuscar) onBuscar(filtros);
  };

  const limpiarFiltros = () => {
    setFiltros({
      categoria: '',
      nombre: '',
      precioMin: '',
      precioMax: ''
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Búsqueda de Productos
        </Typography>

        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="categoria-label">Categoría</InputLabel>
              <Select
                labelId="categoria-label"
                name="categoria"
                value={filtros.categoria}
                onChange={handleChange}
                aria-label="Filtro categoría"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="fruta">Fruta</MenuItem>
                <MenuItem value="verdura">Verdura</MenuItem>
                <MenuItem value="semilla">Semilla</MenuItem>
                <MenuItem value="herramienta">Herramienta</MenuItem>
                <MenuItem value="ganado">Ganado</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre del producto"
              fullWidth
              name="nombre"
              value={filtros.nombre}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Filtro nombre del producto' }}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              label="Precio mínimo"
              type="number"
              fullWidth
              name="precioMin"
              value={filtros.precioMin}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Filtro precio mínimo' }}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              label="Precio máximo"
              type="number"
              fullWidth
              name="precioMax"
              value={filtros.precioMax}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Filtro precio máximo' }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={aplicarFiltros}>
                Aplicar filtros
              </Button>
              <Button variant="outlined" color="secondary" onClick={limpiarFiltros}>
                Limpiar filtros
              </Button>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Container>
  );
}
