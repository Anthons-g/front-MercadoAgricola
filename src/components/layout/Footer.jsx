import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Divider
} from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        maxWidth: '100%',
        px: { xs: 4, sm: 8 },
        py: { xs: 3, sm: 4 }, 
        backgroundColor: '#111',
        color: '#fff',
        mt: 'auto'
      }}
    >
      <Grid container spacing={2}> 
        {/* Contacto institucional */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            FreshRootz
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            General Córdova No. 623 y Padre Solano<br />
            Guayaquil – Ecuador<br />
            Tel: (593 - 4) 3703870 – 2560400<br />
            Email: info@FreshRootz.com.ec
          </Typography>
        </Grid>

        {/* Enlaces de navegación */}
        <Grid item xs={6} sm={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Nosotros
          </Typography>
          {["Quienes somos", "Nuestra historia", "Responsabilidad", "La escuelita", "Contáctanos"].map((item) => (
            <Typography key={item} variant="body2" sx={{ mb: 0.5 }}>
              <Link href="#" color="inherit" underline="hover">{item}</Link>
            </Typography>
          ))}
        </Grid>

        <Grid item xs={6} sm={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Divisiones
          </Typography>
          {["Banano", "Acuacultura", "Mascotas", "Fertilizantes", "Larvicultura"].map((item) => (
            <Typography key={item} variant="body2" sx={{ mb: 0.5 }}>
              <Link href="#" color="inherit" underline="hover">{item}</Link>
            </Typography>
          ))}
        </Grid>

        {/* Newsletter */}
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Newsletter
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Recibe noticias y promociones en tu correo 🌱
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 , maxWidth: 320,width: '100%'}}>
            <TextField
              placeholder="Tu correo"
              variant="filled"
              size="small"
              InputProps={{ disableUnderline: true }}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                width: '100%',
                height: 36,
                '& .MuiInputBase-input': {
                padding: '8px 10px' 
                }
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: '#ffd900',
                color: '#000',
                fontWeight: 'bold',
                width: '100%',
                borderRadius: 1,
                height: 36,
                px: 2,
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: '#ffeb3b' }
              }}
            >
              Suscribirme
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Separador y derechos */}
      <Divider sx={{ my: 2, borderColor: '#444' }} /> {/* 🔧 Menos espacio vertical */}

      <Typography variant="caption" align="center" sx={{ color: '#aaa', mt: 2, mb: 1 }}>
        © 2024 FreshRootz S.A. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
