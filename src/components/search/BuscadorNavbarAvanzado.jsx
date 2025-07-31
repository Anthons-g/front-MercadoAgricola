import React, { useState } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import productos from '../../data/productos.json';
import { useNavigate } from 'react-router-dom';

export default function BuscadorNavbarAvanzado() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  const buscarProducto = () => {
    const encontrado = productos.find(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (encontrado) {
      navigate(`/productos/detalle/${encontrado.id}`);
    } else {
      alert('Producto no encontrado');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#ffffff33',
      padding: '4px 12px',
      borderRadius: '20px',
      '&:hover': { backgroundColor: '#ffffff55' },
      minWidth: 220
    }}>
      <InputBase
        placeholder="Buscar producto…"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && buscarProducto()}
        sx={{ color: 'inherit', ml: 1, flex: 1 }}
      />
      <IconButton
        size="small"
        sx={{ color: 'inherit' }}
        onClick={buscarProducto}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
