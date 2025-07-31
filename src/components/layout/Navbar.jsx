import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom';
import BuscadorNavbarAvanzado from '../search/BuscadorNavbarAvanzado';

export default function Navbar() {
  const navigate = useNavigate();

  // Menú de productos por clic
  const [anchorElProd, setAnchorElProd] = useState(null);
  const handleOpenProductos = (event) => setAnchorElProd(event.currentTarget);
  const handleCloseProductos = () => setAnchorElProd(null);

  // Selector de país por clic
  const [anchorElPais, setAnchorElPais] = useState(null);
  const [paisSeleccionado, setPaisSeleccionado] = useState("Ecuador");
  const handleOpenPais = (event) => setAnchorElPais(event.currentTarget);
  const handleClosePais = () => setAnchorElPais(null);
  const cambiarPais = (pais) => {
    setPaisSeleccionado(pais);
    handleClosePais();
  };

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2
        }}>
          {/* Logo / Título sin ícono hamburguesa */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                FreshRootz
              </Typography>
            </Link>
          </Box>

          {/* Botones institucionales */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button
              color="inherit"
              onClick={() => {
                const target = document.getElementById('seccion-nosotros');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Nosotros
            </Button>

            <Button color="inherit" onClick={handleOpenProductos} endIcon={<ExpandMoreIcon />}>
              Productos
            </Button>
            <Menu
              anchorEl={anchorElProd}
              open={Boolean(anchorElProd)}
              onClose={handleCloseProductos}
              disableScrollLock
              PaperProps={{
                sx: {
                  backgroundColor: '#e8f5e9',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  color: '#2e7d32'
                }
              }}
            >
              <MenuItem onClick={() => navigate('/productos/agricola')}>Agrícola</MenuItem>
              <MenuItem onClick={() => navigate('/productos/banano')}>Banano</MenuItem>
              <MenuItem onClick={() => navigate('/productos/acuacultura')}>Acuacultura</MenuItem>
              <MenuItem onClick={() => navigate('/productos/fertilizantes')}>Fertilizantes</MenuItem>
              <MenuItem onClick={() => navigate('/productos/larvicultura')}>Larvicultura</MenuItem>
              <MenuItem onClick={() => navigate('/productos/mascotas')}>Mascotas</MenuItem>
              <MenuItem onClick={() => navigate('/productos/quimicos')}>Químicos</MenuItem>
              <MenuItem onClick={() => navigate('/productos/saludanimal')}>Salud Animal</MenuItem>
              <MenuItem onClick={() => navigate('/productos/saludpublica')}>Salud Pública</MenuItem>
              <MenuItem onClick={() => navigate('/productos/semillas')}>Semillas</MenuItem>
            </Menu>

            <Button color="inherit" onClick={() => navigate('/servicios')}>
              Servicios en línea
            </Button>

            {/* Nuevo botón institucional */}
            <Button color="inherit" onClick={() => navigate('/capacitacion')}>
              Capacitación
            </Button>

            {/* Selector de país */}
            <Button color="inherit" onClick={handleOpenPais} endIcon={<ExpandMoreIcon />}>
              País: {paisSeleccionado}
            </Button>
            <Menu
              anchorEl={anchorElPais}
              open={Boolean(anchorElPais)}
              onClose={handleClosePais}
              disableScrollLock
              PaperProps={{
                sx: {
                  backgroundColor: '#f1f8e9',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  color: '#33691e'
                }
              }}
            >
              <MenuItem onClick={() => cambiarPais('Ecuador')}>🇪🇨 Ecuador</MenuItem>
              <MenuItem onClick={() => cambiarPais('Perú')}>🇵🇪 Perú</MenuItem>
              <MenuItem onClick={() => cambiarPais('Colombia')}>🇨🇴 Colombia</MenuItem>
              <MenuItem onClick={() => cambiarPais('México')}>🇲🇽 México</MenuItem>
            </Menu>

            {/* Buscador embebido */}
            <BuscadorNavbarAvanzado />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Espaciador institucional */}
      <Box sx={{ height: '70px', mb: 1 }} />
    </>
  );
}
