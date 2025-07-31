import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Link,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import LoginModal from '../../components/modals/LoginModal';
import { apiFetch } from '../../apiFetch';

export default function Comprar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const rol = localStorage.getItem('rol');
  const esAdmin = rol === 'admin';

  // Categorías personalizadas con categorías reales agrupadas
  const categoriasPersonalizadas = {
    Todos: [],
    Mascotas: ['Alimento Perro', 'Alimento Gato', 'Mascotas'],
    Quimicos: ['Químicos', 'Limpieza Y Aseo'],
    Jardineria: ['Fertilizante', 'Semillas', 'Jardinería'],
  };

  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [showLogin, setShowLogin] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    apiFetch('/api/productos')
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const handleCompra = (id) => {
    if (!isLoggedIn) {
      setShowLogin(true);
    } else {
      const productoSeleccionado = productos.find(p => p._id === id);
      if (productoSeleccionado) {
        setCarrito(prev => [...prev, productoSeleccionado]);
      }
    }
  };

  const total = carrito.reduce((acc, prod) => acc + (prod.precio || 0), 0);

  // Función para filtrar productos según filtro personalizado y búsqueda
  const filtrarProductos = () => {
    let listaFiltrada = productos;

    // Si filtro no es "Todos", filtra por categorías relacionadas
    if (filtro !== 'Todos') {
      const categoriasFiltro = categoriasPersonalizadas[filtro] || [];
      listaFiltrada = productos.filter(p =>
        categoriasFiltro.includes(p.categoria)
      );
    }

    // Filtro adicional por búsqueda en nombre (insensible a mayúsculas)
    if (search.trim() !== '') {
      listaFiltrada = listaFiltrada.filter(p =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    return listaFiltrada;
  };

  // Productos filtrados para mostrar en la sección "destacados"
  const productosFiltrados = filtrarProductos();

  // Definir secciones basadas en los filtrados
  const destacados = productosFiltrados.slice(0, 6);
  const masVendidos = productos
    .filter(p => p.ventas >= 50 && productosFiltrados.includes(p))
    .slice(0, 6);
  const ultimos = productosFiltrados.slice(-6);

  const renderProductos = (lista) => (
    <Grid container spacing={3}>
      {lista.map(prod => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={prod._id}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              position: 'relative',
              '&:hover': { transform: 'scale(1.03)' },
            }}
          >
            {prod.descuento && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  bgcolor: '#d32f2f',
                  color: '#fff',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                }}
              >
                -{prod.descuento}%
              </Box>
            )}

            <Box
              component="img"
              src={prod.imagen}
              alt={prod.nombre}
              sx={{
                width: '100%',
                height: 180,
                objectFit: 'contain',
                mb: 2,
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
              }}
            />

            <Link
              href={`/productos/detalle/${prod.categoria}/${prod._id}`}
              underline="hover"
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                color: '#2e7d32',
                mb: 1,
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
                '&:hover': { color: '#145214' },
              }}
              title={prod.nombre}
            >
              {prod.nombre}
            </Link>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography
                sx={{ color: '#388e3c', fontWeight: 'bold', fontSize: '1.1rem' }}
              >
                {typeof prod.precio === 'number'
                  ? `$${prod.precio.toFixed(2)}`
                  : 'Precio no disponible'}
              </Typography>
              {typeof prod.precioOriginal === 'number' && (
                <Typography
                  sx={{
                    color: '#999',
                    textDecoration: 'line-through',
                    fontSize: '0.85rem',
                  }}
                >
                  ${prod.precioOriginal.toFixed(2)}
                </Typography>
              )}
            </Box>

            <Typography
              variant="caption"
              sx={{ color: '#666', mb: 2, userSelect: 'none' }}
            >
              (Exento de IVA)
            </Typography>

            <Button
              fullWidth
              onClick={() => handleCompra(prod._id)}
              variant="outlined"
              sx={{
                borderColor: '#388e3c',
                color: '#388e3c',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 3,
                mb: esAdmin ? 1 : 0,
                '&:hover': { bgcolor: '#e8f5e9' },
              }}
            >
              Agregar al carrito
            </Button>

            {esAdmin && (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/productos/editar/${prod._id}`)}
                  sx={{
                    mb: 1,
                    bgcolor: '#1976d2',
                    '&:hover': { bgcolor: '#1565c0' },
                    textTransform: 'none',
                    borderRadius: 3,
                  }}
                >
                  Editar producto
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={() => navigate(`/productos/eliminar/${prod._id}`)}
                  sx={{ textTransform: 'none', borderRadius: 3 }}
                >
                  🗑️ Eliminar producto
                </Button>
              </>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ pt: 12, pb: 6, px: { xs: 2, md: 6 }, maxWidth: 1300, mx: 'auto' }}>
      {/* Header fijo */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bgcolor: '#fff',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
          py: 1,
          zIndex: 1200,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{
            color: '#2e7d32',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          FreshRootz
        </Typography>

        <TextField
          size="small"
          placeholder="Buscar producto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            bgcolor: '#f1f8e9',
            borderRadius: 20,
            width: { xs: '100%', sm: 240 },
            maxWidth: 300,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'gray' }} />
              </InputAdornment>
            ),
          }}
        />

        {isLoggedIn ? (
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('rol');
              window.location.reload();
            }}
            sx={{
              color: '#d32f2f',
              borderColor: '#d32f2f',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
            }}
          >
            Cerrar sesión
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => setShowLogin(true)}
            sx={{
              color: '#2e7d32',
              borderColor: '#2e7d32',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
            }}
          >
            Iniciar sesión
          </Button>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#2e7d32',
            fontSize: '1rem',
            minWidth: 90,
            justifyContent: 'center',
          }}
          aria-label="Carrito de compras"
          title="Carrito"
        >
          <Typography sx={{ fontSize: '1.3rem' }}>🛒</Typography>
          <Typography>{carrito.length} | ${total.toFixed(2)}</Typography>
        </Box>
      </Box>

      {/* Botón registrar producto para admin */}
      {esAdmin && (
        <Box sx={{ my: 5, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/productos/nuevo')}
            startIcon={<AddBoxIcon />}
            sx={{
              bgcolor: '#388e3c',
              fontWeight: 'bold',
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontSize: '1rem',
              '&:hover': { bgcolor: '#2e7d32' },
            }}
          >
            Registrar producto
          </Button>
        </Box>
      )}

      {/* Botones personalizados de categorías */}
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        {Object.keys(categoriasPersonalizadas).map((cat) => (
          <Button
            key={cat}
            onClick={() => setFiltro(cat)}
            variant={filtro === cat ? 'contained' : 'outlined'}
            sx={{
              textTransform: 'none',
              borderRadius: 20,
              borderColor: '#2e7d32',
              color: filtro === cat ? '#fff' : '#2e7d32',
              bgcolor: filtro === cat ? '#2e7d32' : 'transparent',
              px: 3,
              minWidth: 130,
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: filtro === cat ? '#1b4d19' : '#e8f5e9',
                borderColor: '#2e7d32',
              },
            }}
          >
            {cat}
          </Button>
        ))}
      </Box>

      {/* Secciones */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#2e7d32' }}>
        PRODUCTOS <Box component="span" sx={{ color: '#4caf50' }}>DESTACADOS</Box>
      </Typography>
      {destacados.length > 0 ? (
        renderProductos(destacados)
      ) : (
        <Typography color="text.secondary" sx={{ mb: 5 }}>
          No hay productos en esta categoría.
        </Typography>
      )}

      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', mt: 8, mb: 3, color: '#2e7d32' }}
      >
        MÁS VENDIDOS
      </Typography>
      {masVendidos.length > 0 ? (
        renderProductos(masVendidos)
      ) : (
        <Typography color="text.secondary" sx={{ mb: 5 }}>
          No hay productos más vendidos disponibles.
        </Typography>
      )}

      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', mt: 8, mb: 3, color: '#2e7d32' }}
      >
        ÚLTIMOS PRODUCTOS
      </Typography>
      {ultimos.length > 0 ? (
        renderProductos(ultimos)
      ) : (
        <Typography color="text.secondary" sx={{ mb: 5 }}>
          No hay productos recientes disponibles.
        </Typography>
      )}

      {/* Modal de login */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </Box>
  );
}
