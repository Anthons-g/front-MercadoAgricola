import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Snackbar,
  Alert,
  MenuItem,
  FormControlLabel,
  Switch,
  InputAdornment
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import TagIcon from '@mui/icons-material/LocalOffer';
import CheckIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { apifetch } from '../../apiFetch'; 

const categorias = ['Alimento Perro', 'Alimento Gato', 'Limpieza y Aseo', 'Jardinería'];

export default function ProductoForm() {
  const navigate = useNavigate();
  const [producto, setProducto] = React.useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: '',
    stock: '',
    descuento: '',
    disponible: true,
    imagen: null
  });

  const [errores, setErrores] = React.useState({});
  const [guardado, setGuardado] = React.useState(false);

  const validar = () => {
    const nuevosErrores = {};
    if (!producto.nombre.trim()) nuevosErrores.nombre = 'Nombre obligatorio';
    if (!producto.precio || isNaN(producto.precio)) nuevosErrores.precio = 'Precio válido requerido';
    if (!producto.categoria) nuevosErrores.categoria = 'Selecciona una categoría';
    if (!producto.stock || isNaN(producto.stock)) nuevosErrores.stock = 'Stock válido requerido';
    if (!producto.imagen) nuevosErrores.imagen = 'Imagen obligatoria';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    try {
      const token = localStorage.getItem('token');

      const productoNormalizado = {
  ...producto,
  precio: parseFloat(producto.precio),
  stock: parseInt(producto.stock),
  descuento: parseFloat(producto.descuento || 0),
  disponible: !!producto.disponible
};

const formData = new FormData();
Object.entries(productoNormalizado).forEach(([key, value]) => {
  formData.append(key, value);
});


      const res = await apiFetch('/api/productos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.status === 201) {
        console.log('✅ Producto registrado:', data);
        setGuardado(true);
        setTimeout(() => navigate(-1), 2000);
      } else {
        console.error('❌ Error al guardar:', data);
        alert(data.error || 'Error al guardar producto');
      }
    } catch (err) {
      console.error('❌ Error de conexión:', err);
      alert('Error de conexión con el servidor');
    }
  };

  const handleCancelar = () => {
    navigate(-1);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        maxWidth: 720,
        mx: 'auto',
        mt: 6,
        p: 4,
        boxShadow: 4,
        bgcolor: '#fafafa',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#2e7d32' }}>
        Registrar nuevo producto
      </Typography>

      {/* Grupo 1: Nombre y categoría */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="nombre"
            label="Nombre del producto"
            fullWidth
            autoComplete="off"
            value={producto.nombre}
            onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
            error={!!errores.nombre}
            helperText={errores.nombre}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TagIcon sx={{ color: '#777' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Categoría"
            fullWidth
            value={producto.categoria}
            onChange={(e) => setProducto({ ...producto, categoria: e.target.value })}
            error={!!errores.categoria}
            helperText={errores.categoria}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon sx={{ color: '#777' }} />
                </InputAdornment>
              )
            }}
          >
            {categorias.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Grupo 2: Precio y stock */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="precio"
            label="Precio"
            fullWidth
            type="number"
            value={producto.precio}
            onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
            error={!!errores.precio}
            helperText={errores.precio}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="stock"
            label="Stock disponible"
            fullWidth
            type="number"
            value={producto.stock}
            onChange={(e) => setProducto({ ...producto, stock: e.target.value })}
            error={!!errores.stock}
            helperText={errores.stock}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InventoryIcon sx={{ color: '#777' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>

      {/* Grupo 3: Imagen */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ textTransform: 'none' }}
          >
            Subir imagen del producto
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setProducto({ ...producto, imagen: file });
                }
              }}
            />
          </Button>
          {errores.imagen && (
            <Typography variant="caption" color="error">
              {errores.imagen}
            </Typography>
          )}
          {producto.imagen && (
            <Box mt={2} sx={{ textAlign: 'center' }}>
              <Typography variant="body2">Preview:</Typography>
              <img
                src={URL.createObjectURL(producto.imagen)}
                alt="Preview"
                style={{ maxHeight: 200, borderRadius: 8 }}
              />
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Grupo 4: Descripción y descuento */}
      <TextField
        name="descripcion"
        label="Descripción"
        multiline
        rows={4}
        fullWidth
        value={producto.descripcion}
        onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })}
      />

      <TextField
        name="descuento"
        label="Descuento (%)"
        type="number"
        fullWidth
        value={producto.descuento}
        onChange={(e) => setProducto({ ...producto, descuento: e.target.value })}
      />

      <FormControlLabel
        control={
          <Switch
            checked={producto.disponible}
            onChange={(e) => setProducto({ ...producto, disponible: e.target.checked })}
            color="success"
          />
        }
        label="Producto disponible para compra"
      />

      {/* Botones */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#388e3c', fontWeight: 'bold' }}>
          Guardar producto
        </Button>
        <Button variant="outlined" color="secondary" fullWidth onClick={handleCancelar}>
          Cancelar
        </Button>
      </Box>

      {/* Confirmación */}
      <Snackbar
        open={guardado}
        autoHideDuration={4000}
        onClose={() => setGuardado(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          icon={<CheckIcon fontSize="inherit" />}
          onClose={() => setGuardado(false)}
          sx={{ bgcolor: '#1976d2', color: 'white' }}
        >
          ¡Producto guardado correctamente!
        </Alert>
      </Snackbar>
    </Box>
  );
}
