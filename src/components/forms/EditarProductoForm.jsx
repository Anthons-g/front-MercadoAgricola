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

export default function EditarProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await apiFetch(`/productos/${id}`);
        setProducto(data);
      } catch (err) {
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleGuardar = async () => {
    try {
      await apiFetch(`/productos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });
      setGuardado(true);
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      setError('Error al guardar los cambios');
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Editar Producto
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        fullWidth
        label="Nombre"
        name="nombre"
        value={producto.nombre}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Descripción"
        name="descripcion"
        value={producto.descripcion}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Precio"
        name="precio"
        type="number"
        value={producto.precio}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="URL de Imagen"
        name="imagen"
        value={producto.imagen}
        onChange={handleChange}
        margin="normal"
      />

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleGuardar}>
          Guardar Cambios
        </Button>
      </Box>

      <Snackbar
        open={guardado}
        autoHideDuration={2000}
        onClose={() => setGuardado(false)}
      >
        <Alert onClose={() => setGuardado(false)} severity="success">
          Cambios guardados correctamente
        </Alert>
      </Snackbar>
    </Paper>
  );
}
