import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../apiFetch';

export default function LoginForm({ onClose, onLoginSuccess }) {
  const [mostrarClave, setMostrarClave] = React.useState(false);
  const [errorLogin, setErrorLogin] = React.useState('');
  const [camposVacios, setCamposVacios] = React.useState({
    email: false,
    password: false
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const email = data.email?.trim().toLowerCase();
    const password = data.password?.trim();

    const nuevosErrores = {
      email: !email,
      password: !password
    };
    setCamposVacios(nuevosErrores);
    if (nuevosErrores.email || nuevosErrores.password) return;

    try {
      const res = await apiFetch('/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, contraseña: password })
      });

      const responseData = await res.json();

      if (res.status === 404) throw new Error('Usuario no encontrado');
      if (res.status === 401) throw new Error('Contraseña incorrecta');
      if (!res.ok) throw new Error(responseData.error || 'Error de autenticación');

      const { rol } = responseData;

      // Redirección por rol institucional
      if (rol === 'admin') {
        navigate('/comprar');
      } else if (rol === 'usuario') {
        navigate('/comprar');
      } else {
        throw new Error('Rol no reconocido');
      }

      // Guardado visual de sesión
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('token-email', responseData.correo);
      localStorage.setItem('rol', rol);

      if (onLoginSuccess) onLoginSuccess();
      if (onClose) onClose();
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      setErrorLogin(error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          email: e.target.email?.value,
          password: e.target.password?.value
        });
      }}
      noValidate
      sx={{
        width: 350,
        bgcolor: 'white',
        p: 4,
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(56,142,60,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        fontFamily: "'Segoe UI', sans-serif"
      }}
    >
      <TextField
        name="email"
        label="Correo electrónico"
        type="email"
        fullWidth
        autoFocus
        autoComplete="username"
        variant="outlined"
        error={camposVacios.email}
        helperText={camposVacios.email ? 'Este campo es obligatorio' : ''}
        sx={{
          '& label.Mui-focused': { color: '#4caf50' },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#4caf50'
            }
          }
        }}
      />

      <TextField
        name="password"
        label="Contraseña"
        type={mostrarClave ? 'text' : 'password'}
        fullWidth
        autoComplete="current-password"
        variant="outlined"
        error={camposVacios.password}
        helperText={camposVacios.password ? 'Este campo es obligatorio' : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setMostrarClave(!mostrarClave)}
                edge="end"
                sx={{ color: '#4caf50' }}
              >
                {mostrarClave ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{
          '& label.Mui-focused': { color: '#4caf50' },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#4caf50'
            }
          }
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          background: 'linear-gradient(to right, #66bb6a, #43a047)',
          color: '#fff',
          fontWeight: 'bold',
          paddingY: 1.2,
          borderRadius: 2,
          '&:hover': {
            background: 'linear-gradient(to right, #81c784, #388e3c)'
          }
        }}
      >
        ENTRAR
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 1, color: '#4caf50' }}>
        ¿No tienes cuenta?{' '}
        <a
          href="/registro"
          style={{
            fontWeight: 'bold',
            color: '#388e3c',
            textDecoration: 'underline'
          }}
        >
          Regístrate aquí
        </a>
      </Typography>

      <Snackbar
        open={!!errorLogin}
        autoHideDuration={4000}
        onClose={() => setErrorLogin('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled" onClose={() => setErrorLogin('')}>
          {errorLogin}
        </Alert>
      </Snackbar>
    </Box>
  );
}
