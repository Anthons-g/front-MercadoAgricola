import React from 'react';
import {
  Modal,
  Box,
  IconButton,
  Button,
  Typography,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from '../forms/LoginForm';

export default function LoginModal({ onClose }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [emailActual, setEmailActual] = React.useState(localStorage.getItem('token-email'));

  React.useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('token-email');
      setIsLoggedIn(!!token);
      setEmailActual(email);
    };

    window.addEventListener('storage', checkToken);
    checkToken();

    return () => window.removeEventListener('storage', checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-email');
    setIsLoggedIn(false);
    setEmailActual(null);
    if (onClose) onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="modal-login"
      aria-describedby="login-accessible"
    >
      <Box
        role="dialog"
        aria-modal="true"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#e6f4ea',
          p: 4,
          borderRadius: 4,
          width: { xs: '90%', sm: 400 },
          boxShadow: 10,
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          border: '2px solid #2e7d32'
        }}
      >
        {/* Botón cerrar */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 10, right: 10, color: '#2e7d32' }}
          aria-label="Cerrar login"
        >
          <CloseIcon />
        </IconButton>

        {/* Avatar verde como ícono */}
        <Avatar sx={{ bgcolor: '#2e7d32', width: 56, height: 56 }} />

        {/* Título */}
        <Typography variant="h6" fontWeight={600} color="primary" sx={{ mt: 1 }}>
          Iniciar sesión
        </Typography>

        {/* Formulario si no está logueado */}
        {!isLoggedIn && (
          <LoginForm
            onClose={onClose}
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setEmailActual(localStorage.getItem('token-email'));
            }}
          />
        )}

        {/* Bienvenida si está logueado */}
        {isLoggedIn && emailActual && (
          <>
            <Typography color="textSecondary">
              Sesión activa como <strong>{emailActual}</strong>
            </Typography>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Cerrar sesión
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}
