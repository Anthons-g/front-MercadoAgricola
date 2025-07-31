import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

// Input personalizado con placeholder y label flotante
function InputWithIcon({
  label,
  name,
  icon: Icon,
  value,
  onChange,
  error,
  helperText,
  multiline = false,
  rows = 1,
  placeholder,
}) {
  return (
    <TextField
      variant="outlined"
      name={name}
      fullWidth
      multiline={multiline}
      rows={rows}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      label={label}
      placeholder={placeholder} 
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon color={error ? 'error' : 'action'} />
          </InputAdornment>
        ),
      }}
      sx={{
        bgcolor: '#f9fff9',
        borderRadius: 3,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: error ? '#d32f2f' : '#a5d6a7',
            borderWidth: '2px',
          },
          '&:hover fieldset': {
            borderColor: error ? '#b71c1c' : '#388e3c',
          },
          '&.Mui-focused fieldset': {
            borderColor: error ? '#d32f2f' : '#2e7d32',
            boxShadow: error
              ? '0 0 8px rgba(211,47,47,0.5)'
              : '0 0 10px rgba(46,125,50,0.6)',
          },
        },
      }}
    />
  );
}

export default function ContactoForm() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = React.useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });

  const [errores, setErrores] = React.useState({});
  const [enviado, setEnviado] = React.useState(false);

  const validar = () => {
    const newErrors = {};
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nombre.trim()) newErrors.nombre = 'Este campo es obligatorio';
    if (!formData.correo || !correoRegex.test(formData.correo))
      newErrors.correo = 'Ingrese un correo válido';
    if (!formData.asunto.trim()) newErrors.asunto = 'Debe ingresar un asunto';
    if (!formData.mensaje.trim()) newErrors.mensaje = 'Debe escribir un mensaje';

    setErrores(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      console.log('Mensaje enviado:', formData);
      setEnviado(true);
      setFormData({ nombre: '', correo: '', asunto: '', mensaje: '' });
      setTimeout(() => navigate(-1), 3000);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #4caf50 0%, #81c784 50%, #a5d6a7 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: isMobile ? 2 : 5,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            width: '100%',
            maxWidth: 720,
            bgcolor: 'rgba(255,255,255,0.95)',
            borderRadius: 4,
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            px: isMobile ? 3 : 6,
            py: isMobile ? 4 : 6,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              color: '#1b5e20',
              fontWeight: 700,
              fontSize: isMobile ? '1.8rem' : '2.6rem',
              mb: 5,
              justifyContent: 'center',
            }}
          >
            <SupportAgentIcon fontSize="inherit" />
            <Typography component="h1">Solicita tu asesoría personalizada</Typography>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{
              mb: 5,
              color: '#2e7d32',
              fontWeight: 600,
              textAlign: 'center',
              fontSize: isMobile ? '1.05rem' : '1.25rem',
            }}
          >
            ¿Necesitas ayuda con tus productos, accesibilidad o compras institucionales? <br />
            Nuestro equipo te responderá en menos de <strong>48 horas</strong>.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputWithIcon
                label="Nombre completo"
                placeholder="Escribe tu nombre completo aquí"
                name="nombre"
                icon={AccountCircleIcon}
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                error={!!errores.nombre}
                helperText={errores.nombre}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputWithIcon
                label="Correo electrónico"
                placeholder="Escribe tu correo electrónico aquí"
                name="correo"
                icon={EmailIcon}
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                error={!!errores.correo}
                helperText={errores.correo}
              />
            </Grid>

            <Grid item xs={12}>
              <InputWithIcon
                label="Asunto"
                placeholder="Escribe el asunto de tu consulta"
                name="asunto"
                icon={SubjectIcon}
                value={formData.asunto}
                onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                error={!!errores.asunto}
                helperText={errores.asunto}
              />
            </Grid>

            <Grid item xs={12}>
              <InputWithIcon
                label="Mensaje detallado"
                placeholder="Escribe tu mensaje aquí"
                name="mensaje"
                icon={SubjectIcon}
                multiline
                rows={6}
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                error={!!errores.mensaje}
                helperText={errores.mensaje}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 6,
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 3,
              justifyContent: 'center',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              startIcon={<SendIcon />}
              fullWidth={isMobile}
              sx={{
                bgcolor: 'linear-gradient(45deg, #388e3c, #81c784)',
                fontWeight: 700,
                fontSize: '1.1rem',
                py: 1.8,
                borderRadius: 4,
                boxShadow: '0 6px 20px rgba(56,142,60,0.5)',
                '&:hover': {
                  bgcolor: 'linear-gradient(45deg, #2e7d32, #4caf50)',
                  boxShadow: '0 8px 30px rgba(46,125,50,0.7)',
                },
              }}
            >
              Solicitar asesoría
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              fullWidth={isMobile}
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                py: 1.8,
                borderRadius: 4,
                borderWidth: '2px',
              }}
            >
              Cancelar
            </Button>
          </Box>

          <Snackbar
            open={enviado}
            autoHideDuration={4000}
            onClose={() => setEnviado(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              severity="success"
              variant="filled"
              onClose={() => setEnviado(false)}
              sx={{
                bgcolor: '#2e7d32',
                color: 'white',
                fontWeight: '700',
                fontSize: '1rem',
              }}
            >
              ¡Tu solicitud ha sido enviada correctamente!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </MainLayout>
  );
}
