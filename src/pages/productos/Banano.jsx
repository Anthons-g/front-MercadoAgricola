import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Typography, Chip, Paper,
  Button, Breadcrumbs, Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductoCard from '../../components/productos/ProductoCard';
import MainLayout from '../../components/layout/MainLayout';
import api from '../../api';
export default function Banano() {
  const navigate = useNavigate();
  const [productosBanano, setProductosBanano] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('api/productos?categoria=Banano')
      .then((res) => {
        setProductosBanano(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar productos Banano:', err);
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <Box sx={{ px: 4, py: 6, maxWidth: '1200px', mx: 'auto' }}>
        {/* Navegación */}
        <Breadcrumbs separator="›" sx={{ mb: 3 }}>
          <Link href="/" color="#2e7d32">Inicio</Link>
          <Typography color="text.primary">Banano</Typography>
        </Breadcrumbs>

        {/* Título */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
          Productos para Banano
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5 }}>
          Soluciones confiables para el cultivo de banano con enfoque sostenible y técnico 🍃
        </Typography>

        {/* Tarjetas */}
        <Grid container spacing={4}>
          {!loading && productosBanano.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
              No se encontraron productos en esta categoría.
            </Typography>
          )}
          {productosBanano.map((producto) => (
            <Grid item xs={12} sm={6} md={4} key={producto._id}>
              <Paper
                elevation={0}
                onClick={() => navigate(`/productos/detalle/${producto.categoria.toLowerCase()}/${producto._id}`)}
                sx={{
                  position: 'relative',
                  p: 2,
                  borderRadius: 3,
                  cursor: 'pointer',
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <ProductoCard producto={producto} />
                {producto.destacado && (
                  <Chip
                    label={producto.destacado}
                    color="success"
                    size="small"
                    sx={{ position: 'absolute', top: 12, left: 12 }}
                  />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Asesoría */}
        <Box sx={{
          mt: 8,
          py: 5,
          px: 4,
          borderRadius: 4,
          backgroundColor: '#f1f8e9',
          boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            ¿Necesitás asesoría personalizada?
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Nuestro equipo técnico puede ayudarte a seleccionar el producto ideal para tu cultivo 🍌
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => navigate('/contacto')}
            sx={{
              borderRadius: 20,
              px: 4,
              fontWeight: 'bold',
              boxShadow: '0 3px 8px rgba(0,0,0,0.2)'
            }}
          >
            Solicitar asesoría
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
}
