import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Tabs, Tab } from '@mui/material';
import { categoriaPaths } from '../../utils/categorias';
import { apiFetch } from '../../apiFetch';

import { Box, Typography, Grid, Breadcrumbs, Link, Paper } from '@mui/material';

export default function Detalle() {
  const { id } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/api/productos/${id}`)
      .then((data) => {
        setProducto(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar producto', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <Box sx={{ mt: 8, px: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Cargando producto...
          </Typography>
        </Box>
      </MainLayout>
    );
  }

  if (!producto || producto.error) {
    return (
      <MainLayout>
        <Box sx={{ mt: 8, px: 4 }}>
          <Typography variant="h6" color="error">
            Producto no encontrado
          </Typography>
        </Box>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Box sx={{ px: 4, py: 6, maxWidth: '1200px', mx: 'auto' }}>
        {/* Breadcrumbs */}
        <Breadcrumbs separator="›" sx={{ mb: 3 }}>
          <Link href="/" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
            Inicio
          </Link>
          <Link
            href={`/productos/${categoriaPaths[producto.categoria] || producto.categoria}`}
            sx={{ color: '#2e7d32', fontWeight: 'bold' }}
                  >
            {producto.categoria}
          </Link>
          <Typography sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
            {producto.nombre}
          </Typography>
        </Breadcrumbs>

        {/* Imagen e información */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ borderRadius: 3, p: 1 }}>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{
                  width: '100%',
                  borderRadius: 8,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
              {producto.nombre}
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              {producto.tipo}
            </Typography>

            {producto.botones?.map((btn, i) => (
              <Button
                key={i}
                variant="contained"
                href={btn.url}
                target="_blank"
                sx={{
                  bgcolor: '#f7931e',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: 20,
                  px: 4,
                  py: 1.5,
                  boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
                  '&:hover': { bgcolor: '#e07c00' },
                  mb: 2
                }}
              >
                {btn.label}
              </Button>
            ))}
          </Grid>
        </Grid>

        {/* Tabs y contenido */}
        <Box sx={{ mt: 6, maxWidth: 1100, mx: 'auto' }}>
          <Box
            sx={{
              backgroundColor: '#2e7d32',
              borderRadius: '12px 12px 0 0',
              display: 'flex',
              justifyContent: 'center',
              px: 1
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={(_, val) => setTabIndex(val)}
              variant="scrollable"
              scrollButtons="auto"
              TabIndicatorProps={{ style: { display: 'none' } }}
            >
              {['Descripción', 'Tipo', 'Subtipo', 'Presentaciones', 'Modo de uso'].map((label, i) => (
                <Tab
                  key={label}
                  label={label}
                  sx={{
                    bgcolor: tabIndex === i ? '#fff' : 'transparent',
                    color: tabIndex === i ? '#2e7d32' : '#fff',
                    borderRadius: '12px 12px 0 0',
                    mx: 1,
                    minWidth: 120,
                    fontWeight: 'bold',
                    fontSize: '0.95rem'
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              px: 6,
              py: 4,
              textAlign: 'center',
              borderRadius: '0 0 12px 12px',
              minHeight: 160
            }}
          >
            {tabIndex === 0 && (
              <>
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                  {producto.descripcion}
                </Typography>
                {producto.ingredienteActivo && (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <strong>Ingrediente activo:</strong> {producto.ingredienteActivo}
                  </Typography>
                )}
              </>
            )}
            {tabIndex === 1 && (
              <Typography variant="body1">{producto.tipo}</Typography>
            )}
            {tabIndex === 2 && (
              <Typography variant="body1">
                {producto.subtipo || 'No especificado'}
              </Typography>
            )}
            {tabIndex === 3 && (
              <Typography variant="body1">{producto.presentaciones}</Typography>
            )}
            {tabIndex === 4 && (
              <Typography variant="body1">{producto.modoDeUso}</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}
