'use client';

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton
} from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

export default function RegistroAgricola({ onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    nombre: '',
    identificacion: '',
    celular: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
    aceptaPolitica: false
  });

  const [mostrarPassword, setMostrarPassword] = React.useState(false);
  const [errores, setErrores] = React.useState({});
  const [registroExitoso, setRegistroExitoso] = React.useState(false);

  const toggleMostrarPassword = () => setMostrarPassword((prev) => !prev);

  const validar = () => {
    const nuevosErrores = {};
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[0-9]{7,}$/;

    if (!formData.nombre.trim()) nuevosErrores.nombre = 'Rellena este campo obligatorio.';
    if (!formData.identificacion.trim()) nuevosErrores.identificacion = 'Rellena este campo obligatorio.';
    if (!formData.celular || !telefonoRegex.test(formData.celular)) nuevosErrores.celular = 'Número inválido.';
    if (!formData.correo || !correoRegex.test(formData.correo)) nuevosErrores.correo = 'Correo inválido.';
    if (!formData.contraseña || formData.contraseña.length < 6)
      nuevosErrores.contraseña = 'Debe tener al menos 6 caracteres.';
    if (formData.contraseña !== formData.confirmarContraseña)
      nuevosErrores.confirmarContraseña = 'Las contraseñas no coinciden.';
    if (!formData.aceptaPolitica) nuevosErrores.aceptaPolitica = 'Debes aceptar la política de privacidad.';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    try {
      const res = await fetch('/api/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: formData.correo.trim(),
          contraseña: formData.contraseña
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al registrar');

      setRegistroExitoso(true);
      setTimeout(() => navigate('/comprar'), 3000);
    } catch (error) {
      setErrores({ general: error.message });
    }
  };

  return (
    <MainLayout>
      <Grid container sx={{ minHeight: '100vh', bgcolor: '#f0fdf4' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ p: 6, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
        >
          <Typography variant="overline" color="green" sx={{ fontWeight: 'bold' }}>
            Registro Agrícola - Plataforma
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
            🌿 Forma parte del cambio en el campo
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Queremos que los agricultores y emprendedores rurales accedan a un sistema justo, fácil y adaptado a sus necesidades.
          </Typography>
          <Typography variant="body2" sx={{ mt: 4 }}>
            ✅ ¿Para qué sirve? Este registro nos permite saber más de ti y mejorar los servicios agrícolas digitales.
            <br />
            ✅ ¿Qué obtienes? Acceso prioritario, asistencia personalizada y beneficios exclusivos.
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ bgcolor: 'white', p: 5, borderTopLeftRadius: 40, borderBottomLeftRadius: 40 }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              label="Nombre y Apellido"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              error={!!errores.nombre}
              helperText={errores.nombre}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AgricultureIcon color="success" />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Número de identificación"
              value={formData.identificacion}
              onChange={(e) => setFormData({ ...formData, identificacion: e.target.value })}
              error={!!errores.identificacion}
              helperText={errores.identificacion}
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Número de celular"
              value={formData.celular}
              onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
              error={!!errores.celular}
              helperText={errores.celular}
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Correo electrónico"
              type="email"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              error={!!errores.correo}
              helperText={errores.correo}
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Contraseña"
              type={mostrarPassword ? 'text' : 'password'}
              value={formData.contraseña}
              onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
              error={!!errores.contraseña}
              helperText={errores.contraseña}
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleMostrarPassword} edge="end">
                      {mostrarPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Confirmar Contraseña"
              type={mostrarPassword ? 'text' : 'password'}
              value={formData.confirmarContraseña}
              onChange={(e) => setFormData({ ...formData, confirmarContraseña: e.target.value })}
              error={!!errores.confirmarContraseña}
              helperText={errores.confirmarContraseña}
              fullWidth
              variant="outlined"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.aceptaPolitica}
                  onChange={(e) => setFormData({ ...formData, aceptaPolitica: e.target.checked })}
                  color="success"
                />
              }
              label={
                <Typography variant="body2">
                  Acepto la{' '}
                  <a href="#" style={{ color: '#2e7d32', textDecoration: 'underline' }}>
                    Política de Privacidad
                  </a>{' '}
                  y el tratamiento de mis datos.
                </Typography>
              }
            />
            {errores.aceptaPolitica && (
              <Typography variant="caption" color="error">
                {errores.aceptaPolitica}
              </Typography>
            )}
            {errores.general && (
              <Alert severity="error" variant="outlined">
                {errores.general}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#388e3c',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#2e7d32' },
                mt: 2
              }}
            >
              Registrarme
            </Button>

            <Snackbar
              open={registroExitoso}
              autoHideDuration={4000}
              onClose={() => setRegistroExitoso(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert severity="success" variant="filled" onClose={() => setRegistroExitoso(false)}>
                ¡Registro exitoso! Redirigiendo...
              </Alert>
            </Snackbar>
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
