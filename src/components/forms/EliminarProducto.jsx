import React from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../apiFetch';

export default function EliminarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rol = localStorage.getItem('rol');
  const esAdmin = rol === 'admin';

  const [producto, setProducto] = React.useState(null);
  const [confirmado, setConfirmado] = React.useState(false);
  const [eliminando, setEliminando] = React.useState(false);

  React.useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await apiFetch(`/api/productos/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!res.ok) throw new Error('No se encontró el producto');
        const data = await res.json();
        setProducto(data);
      } catch (error) {
        console.error('🔴 Error al obtener producto:', error);
        navigate('/');
      }
    };

    if (esAdmin) obtenerProducto();
    else navigate('/');
  }, [id, esAdmin, navigate]);

  const handleEliminar = async () => {
    setEliminando(true);
    try {
      const respuesta = await apiFetch(`/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!respuesta.ok) throw new Error('Error al eliminar');
      const resultado = await respuesta.json();
      console.log(`✅ Producto eliminado: ${resultado?.mensaje || 'sin mensaje'}`);
      setConfirmado(true);
      setTimeout(() => navigate('/comprar'), 2000);
    } catch (err) {
      console.error('❌ Error eliminando producto:', err);
      alert('No se pudo eliminar el producto. Verificá credenciales o endpoint.');
      setEliminando(false);
    }
  };

  const handleCancelar = () => navigate(-1);

  if (!producto) return null;

  return (
    <>
      <Dialog open>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
          ¿Deseás eliminar este producto?
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Esta acción eliminará el producto de forma <strong>permanente</strong>.
          </Typography>

          <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography><strong>Nombre:</strong> {producto.nombre}</Typography>
            <Typography><strong>ID:</strong> {producto._id}</Typography>
            <Typography><strong>Precio:</strong> ${producto.precio}</Typography>
            <Typography sx={{ mt: 1, fontSize: '0.85rem', color: '#999' }}>
              (Esta acción no puede revertirse desde el panel de administración)
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button
            onClick={handleCancelar}
            variant="outlined"
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            Cancelar
          </Button>

          <Button
            onClick={handleEliminar}
            variant="contained"
            color="error"
            disabled={eliminando}
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
          >
            Eliminar permanentemente
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={confirmado}
        autoHideDuration={4000}
        onClose={() => setConfirmado(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ bgcolor: '#1976d2', color: 'white' }}>
          ¡Producto eliminado correctamente!
        </Alert>
      </Snackbar>
    </>
  );
}
