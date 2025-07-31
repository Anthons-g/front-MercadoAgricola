import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Slider,
  Switch,
  Button
} from '@mui/material';

export default function BuscadorTienda({ productos, onFiltrar }) {
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState([0, 100]);
  const [disponible, setDisponible] = useState(false);

  useEffect(() => {
    const filtrados = productos.filter(p => {
      const enCategoria = categoria ? p.categoria === categoria : true;
      const enPrecio = p.precio >= precio[0] && p.precio <= precio[1];
      const estaDisponible = disponible ? p.disponible : true;
      return enCategoria && enPrecio && estaDisponible;
    });
    onFiltrar(filtrados);
  }, [categoria, precio, disponible, productos, onFiltrar]);

  const limpiar = () => {
    setCategoria('');
    setPrecio([0, 100]);
    setDisponible(false);
  };

  return (
    <Box sx={{ mb: 4, p: 2, bgcolor: '#f1f8e9', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Filtros de búsqueda
      </Typography>

      <TextField
        select
        label="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Todas</MenuItem>
        <MenuItem value="Alimento Perro">Alimento Perro</MenuItem>
        <MenuItem value="Alimento Gato">Alimento Gato</MenuItem>
        <MenuItem value="Limpieza Y Aseo">Limpieza Y Aseo</MenuItem>
        <MenuItem value="Jardinería">Jardinería</MenuItem>
      </TextField>

      <Typography sx={{ mb: 1 }}>Rango de precio</Typography>
      <Slider
        value={precio}
        onChange={(e, nuevoValor) => setPrecio(nuevoValor)}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ mr: 2 }}>Solo disponibles</Typography>
        <Switch
          checked={disponible}
          onChange={(e) => setDisponible(e.target.checked)}
          color="success"
        />
      </Box>

      <Button variant="outlined" onClick={limpiar} sx={{ textTransform: 'none' }}>
        Limpiar filtros
      </Button>
    </Box>
  );
}
