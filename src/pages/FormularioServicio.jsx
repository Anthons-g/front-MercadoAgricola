'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  OutlinedInput,
  Grid
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

import MainLayout from '../components/layout/MainLayout'; 

const tiposServicio = [
  'Cotización agrícola',
  'Consulta veterinaria',
  'Laboratorio técnico',
  'Soporte rural',
  'Rastreo de pedido'
];

export default function FormularioServicio() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipo: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    temp.nombre = formData.nombre ? '' : 'El nombre es obligatorio';
    temp.email = /\S+@\S+\.\S+/.test(formData.email) ? '' : 'Correo inválido';
    temp.tipo = formData.tipo ? '' : 'Selecciona un tipo de servicio';
    temp.mensaje = formData.mensaje.length >= 10 ? '' : 'Mínimo 10 caracteres';
    setErrors(temp);
    return Object.values(temp).every(x => x === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('✅ Solicitud enviada:', formData);
      alert('✅ Solicitud enviada correctamente (modo local)');
      setFormData({ nombre: '', email: '', tipo: '', mensaje: '' });
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          background: 'linear-gradient(120deg, #f1f8e9, #e8f5e9)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          pt: 4,
          px: { xs: 3, sm: 6 },
          pb: 6
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 3,
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#2e7d32',
            textShadow: '1px 1px #c8e6c9',
            width: '100%',
            maxWidth: 900
          }}
        >
          🌾 Solicita tu Servicio en Línea
        </Typography>

        <Box sx={{ width: '100%', maxWidth: 900 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre completo"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.tipo}>
                  <InputLabel id="tipo-label">Tipo de servicio</InputLabel>
                  <Select
                    labelId="tipo-label"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tipo de servicio" />}
                  >
                    {tiposServicio.map((tipo, i) => (
                      <MenuItem key={i} value={tipo}>
                        {tipo}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.tipo}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Mensaje o detalle del servicio"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  error={!!errors.mensaje}
                  helperText={errors.mensaje}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{
                    backgroundColor: '#388e3c',
                    color: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 2,
                    '&:hover': { backgroundColor: '#2e7d32' }
                  }}
                >
                  Enviar Solicitud
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  endIcon={<CancelIcon />}
                  onClick={handleCancel}
                  sx={{
                    color: '#c62828',
                    borderColor: '#c62828',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#ffcdd2',
                      borderColor: '#b71c1c'
                    }
                  }}
                >
                  Cancelar Solicitud
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </MainLayout>
  );
}
