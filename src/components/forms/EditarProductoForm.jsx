import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { apiFetch } from '../../apiFetch';

export default function AdminEditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: '',
    imagen: '',
    descuento: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Cargar datos producto
  useEffect(() => {
    async function fetchProducto() {
      try {
        const res = await apiFetch(`/api/productos/${id}`);
        if (!res.ok) throw new Error('Error al cargar el producto');
        const data = await res.json();
        setProducto({
          nombre: data.nombre || '',
          categoria: data.categoria || '',
          precio: data.precio?.toString() || '',
          descripcion: data.descripcion || '',
          imagen: data.imagen || '',
          descuento: data.descuento?.toString() || '',
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchProducto();
  }, [id]);

  // Actualizar inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);

    if (!producto.nombre || !producto.categoria || !producto.precio) {
      setError('Nombre, categoría y precio son obligatorios.');
      setGuardando(false);
      return;
    }

    try {
  const token = localStorage.getItem('token'); 

  const res = await apiFetch(`/api/productos/${id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    ...producto,
    precio: parseFloat(producto.precio),
    descuento: producto.descuento ? parseInt(producto.descuento) : 0,
  }),
});
      if (!res.ok) throw new Error('Error al guardar producto');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    navigate('/comprar'); 
  };

  if (loading) return (
    <Box
      sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress color="success" />
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#e8f5e9',
        p: { xs: 3, md: 6 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: { xs: '100%', md: 700 },
          p: 6,
          borderRadius: 4,
          bgcolor: 'white',
          boxShadow: '0 12px 30px rgba(76,175,80,0.3)', 
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 20px 40px rgba(76,175,80,0.5)',
          },
        }}
      >
        <Typography
          variant="h3"
          color="success.main"
          sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center', letterSpacing: 2 }}
        >
          Editar Producto
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, fontWeight: 'bold' }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            margin="normal"
            required
            autoFocus
            sx={{ bgcolor: '#f1f8e9', borderRadius: 2 }}
          />

          <TextField
            fullWidth
            label="Categoría"
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            margin="normal"
            required
            helperText="Ejemplo: Mascotas, Químicos, Jardinería"
            sx={{ bgcolor: '#f1f8e9', borderRadius: 2 }}
          />

          <TextField
            fullWidth
            label="Precio (USD)"
            name="precio"
            type="number"
            value={producto.precio}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{ min: 0, step: "0.01" }}
            sx={{ bgcolor: '#f1f8e9', borderRadius: 2 }}
          />

          <TextField
            fullWidth
            label="Descuento (%)"
            name="descuento"
            type="number"
            value={producto.descuento}
            onChange={handleChange}
            margin="normal"
            inputProps={{ min: 0, max: 100 }}
            helperText="Opcional"
            sx={{ bgcolor: '#f1f8e9', borderRadius: 2 }}
          />

          <TextField
            fullWidth
            label="Imagen (URL)"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            margin="normal"
            placeholder="https://ejemplo.com/imagen.jpg"
            sx={{ bgcolor: '#f1f8e9', borderRadius: 2 }}
          />

          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={5}
            sx={{ bgcolor: '#f1f8e9', borderRadius: 2 }}
          />

          <Box
            sx={{
              mt: 5,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate('/productos')}
              sx={{
                flex: '1 1 45%',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': { bgcolor: '#ef5350', color: '#fff' },
              }}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={guardando}
              sx={{
                flex: '1 1 45%',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                borderRadius: 4,
                boxShadow: '0 6px 15px rgba(76,175,80,0.6)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#388e3c',
                  boxShadow: '0 10px 25px rgba(56,142,60,0.8)',
                },
              }}
            >
              {guardando ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.1rem' }}
        >
          ¡Producto guardado correctamente!
        </Alert>
      </Snackbar>
    </Box>
  );
}
