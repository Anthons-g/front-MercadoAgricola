import React, { useContext, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Button
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import AgricultureIcon from '@mui/icons-material/Agriculture';
import YardIcon from '@mui/icons-material/Yard';
import StoreIcon from '@mui/icons-material/Store';
import HandymanIcon from '@mui/icons-material/Handyman';
import PetsIcon from '@mui/icons-material/Pets';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import BugReportIcon from '@mui/icons-material/BugReport';
import ScienceIcon from '@mui/icons-material/Science';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useAccessibility } from '../context/AccessibilityContext';
import VideoVecolAgripacStyle from '../components/VideoVecolAgripacStyle';


import AccessibilityFAB from '../components/accessibility/AccessibilityFAB';
import { Link } from 'react-router-dom';

export default function PantallaInicio() {
const { detenerAnimaciones, ocultarImágenes, panelAbierto } = useAccessibility();

  useEffect(() => {
    document.body.classList.toggle('detener-animaciones-visuales', detenerAnimaciones);
  }, [detenerAnimaciones]);

  const transparente =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/w8AAn0B9XAwSCUAAAAASUVORK5CYII=';

  const secciones = [
    { imagen: '/imagenes/carrusel1.webp', titulo: 'La naturaleza nos da vida, nosotros la protegemos', subtitulo: 'Cuidamos cada paso del proceso productivo' },
    { imagen: '/imagenes/carrusel2.webp', titulo: 'Ganadería responsable para alimentar al mundo', subtitulo: 'Cultivamos con respeto por la tierra' },
    { imagen: '/imagenes/carrusel3.webp', titulo: 'Sembramos futuro con cada semilla', subtitulo: 'Innovación desde el inicio del ciclo productivo' },
    { imagen: '/imagenes/carrusel4.webp', titulo: 'Frutas frescas, sabor natural directo del campo', subtitulo: 'Calidad agrícola para todos' }
  ];

  const divisiones = [
    { nombre: 'Acuacultura', color: '#03A9F4', icono: <WaterDropIcon fontSize="large" /> },
    { nombre: 'Agricola', color: '#4CAF50', icono: <AgricultureIcon fontSize="large" /> },
    { nombre: 'Banano', color: '#FFEB3B', icono: <StoreIcon fontSize="large" /> },
    { nombre: 'Fertilizantes', color: '#8BC34A', icono: <YardIcon fontSize="large" /> },
    { nombre: 'Larvicultura', color: '#00BCD4', icono: <BugReportIcon fontSize="large" /> },
    { nombre: 'Mascotas', color: '#009688', icono: <PetsIcon fontSize="large" /> },
    { nombre: 'Quimicos', color: '#9C27B0', icono: <ScienceIcon fontSize="large" /> },
    { nombre: 'SaludAnimal', color: '#FF9800', icono: <VaccinesIcon fontSize="large" /> },
    { nombre: 'SaludPublica', color: '#2196F3', icono: <HandymanIcon fontSize="large" /> },
    { nombre: 'Semillas', color: '#388E3C', icono: <YardIcon fontSize="large" /> }
  ];

  // Aquí agrego las definiciones que faltaban para evitar el error
  const estilosCardNoticia = {
    position: 'relative',
    borderRadius: 3,
    overflow: 'hidden',
    height: '100%',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
    }
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  };

  const overlayStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    padding: '16px'
  };

  const fechaStyle = {
    position: 'absolute',
    top: 12,
    right: 12,
    background: '#1976d2',
    color: '#fff',
    borderRadius: '8px',
    padding: '4px 8px',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  };

  return (
  <Box
    sx={{
      width: '100%',
      mt: 2,
      lineHeight: 'var(--altura-linea)',
      letterSpacing: 'var(--espaciado-letra)',
      fontFamily: 'var(--font-family, Arial, sans-serif)',
      transition: 'all 0.3s ease'
    }}
  >
      {/* Carrusel institucional */}
      <Swiper
        key={`${detenerAnimaciones ? 'sin-auto' : 'con-auto'}-${ocultarImágenes ? 'sin-img' : 'con-img'}`}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={detenerAnimaciones ? undefined : { delay: 30000, disableOnInteraction: false }}
        speed={800}
        loop={!detenerAnimaciones}
        style={{ height: '60vh', position: 'relative', zIndex: 1 }}
      >
        {secciones.map((item, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ position: 'relative', height: '100%', minHeight: '60vh', overflow: 'hidden' }}>
              <img
                src={ocultarImágenes ? transparente : item.imagen}
                alt={item.titulo}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  opacity: ocultarImágenes ? 0 : 1,
                  transition: 'opacity 0.3s ease'
                }}
              />
              <Box sx={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.35)', zIndex: 1 }} />
              <Box sx={{ position: 'absolute', top: 40, left: 60, zIndex: 2, color: '#fff', maxWidth: '60%' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px #000' }}>
                  {item.titulo}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, textShadow: '1px 1px 3px #000' }}>
                  {item.subtitulo}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botón flotante de accesibilidad */}
      <AccessibilityFAB />
      {!panelAbierto && (
  <Box
    sx={{
      position: 'fixed',
      bottom: 96, 
      right: 24,
      zIndex: 1301,
      transition: 'all 0.3s ease-in-out'
    }}
  >
    <Link to="/comprar" style={{ textDecoration: 'none' }}>
      <Button
        sx={{
          borderRadius: '50%',
          minWidth: 0,
          width: 56,
          height: 56,
          bgcolor: '#388e3c',
          color: 'white',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          fontSize: '1.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s',
          '&:hover': {
            bgcolor: '#2e7d32'
          }
        }}
        aria-label="Ir a compras"
        title="Ir a compras"
      >
        🛍️
      </Button>
    </Link>
  </Box>
)}


      {/* Divisiones */}
      <Box sx={{ px: 4, py: 6, maxWidth: '1080px', mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }} align="center">
          Nuestras Divisiones
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          {divisiones.map((div, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <Link
                to={`/productos/${div.nombre.toLowerCase().replace(/\s/g, '-')}`}
                style={{ textDecoration: 'none' }}
              >
                <Card sx={{
                  backgroundColor: div.color,
                  color: '#fff',
                  borderRadius: 8,
                  height: 240,
                  minWidth: 130,
                  maxWidth: 170,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }
                }}>
                  {div.icono}
                  <Typography variant="subtitle2" sx={{ mt: 1.5, fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {div.nombre}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Video institucional */}
      <VideoVecolAgripacStyle />
  
      {/* Productos destacados */}
      <Box sx={{ px: 4, pb: 6, maxWidth: '1080px', mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }} align="center">
          Productos Destacados
        </Typography>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          breakpoints={{
            600: { slidesPerView: 2 },
            960: { slidesPerView: 3 }
          }}
        >
          {[
            {
              nombre: 'Semilla Maíz Amarillo',
              descripcion: 'Híbrido de alto rendimiento para zonas costeras',
              imagen: '/imagenes/maizamarillo.png',
              destacado: true
            },
            {
              nombre: 'Vacuna BoviSafe',
              descripcion: 'Protege contra enfermedades virales en bovinos',
              imagen: '/imagenes/vacunabovi.png'
            },
            {
              nombre: 'Balanceado Tilapia Plus',
              descripcion: 'Nutrición avanzada para crecimiento acuícola',
              imagen: '/imagenes/tilapia.png',
              destacado: true
            },
            {
              nombre: 'Fertilizante GreenGrow',
              descripcion: 'Optimiza nutrición vegetal en cultivos sensibles',
              imagen: '/imagenes/fertilizante.png'
            },
            {
              nombre: 'Larvicida AquaShield',
              descripcion: 'Control efectivo en ciclos acuáticos intensivos',
              imagen: '/imagenes/larvicida.png',
              destacado: true
            }
          ].map((prod, index) => (
            <SwiperSlide key={index}>
              <Card sx={{
                borderRadius: 4,
                boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 10px 28px rgba(0,0,0,0.2)'
                }
              }}>
                <Box sx={{ position: 'relative', height: 180, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain'
                    }}
                  />
                  {prod.destacado && (
                    <Box sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      backgroundColor: '#FFB300',
                      color: '#fff',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                    }}>
                      ⭐ Destacado
                    </Box>
                  )}
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {prod.nombre}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                    {prod.descripcion}
                  </Typography>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

 {/* Nosotros*/}
<section id="seccion-nosotros"
style={{ scrollMarginTop: '80px' }} >
  <Box sx={{ px: 4, py: 6, maxWidth: '1080px', mx: 'auto' }}>
    <Typography
      variant="h4"
      align="center"
      sx={{
        fontWeight: 'bold',
        mb: 4,
        animation: 'fadeUp 0.6s ease'
      }}
    >
      Nosotros
    </Typography>

    <Grid container spacing={3}>
      {/* Grande */}
      <Grid item xs={12} md={8}>
        <Card sx={{ ...estilosCardNoticia }}>
          <img
            src="/imagenes/inaguracion.webp"
            alt="Centro logístico en Santa Elena"
            style={imgStyle}
          />
          <Box sx={fechaStyle}>Marzo 2025</Box>
          <Box sx={overlayStyle}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Centro logístico inaugurado
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              Expande cobertura en Santa Elena con mayor eficiencia operativa.
            </Typography>
          </Box>
        </Card>
      </Grid>

      {/* Pequeñas */}
      <Grid item xs={12} md={4}>
        <Grid container spacing={3} direction="column">
          {[{
            titulo: 'Vacunación contra fiebre aftosa',
            imagen: '/imagenes/vacuna.webp',
            descripcion: 'Mejorando la trazabilidad y sanidad animal',
            fecha: 'Febrero 2025'
          }, {
            titulo: 'Capacitaciones',
            imagen: '/imagenes/jovenes.webp',
            descripcion: 'Capacitaciones para menores de 30 años.',
            fecha: 'Enero 2025'
          }].map((evento, index) => (
            <Grid item key={index}>
              <Card sx={{ ...estilosCardNoticia, height: 200 }}>
                <img
                  src={evento.imagen}
                  alt={evento.titulo}
                  style={imgStyle}
                />
                <Box sx={fechaStyle}>{evento.fecha}</Box>
                <Box sx={overlayStyle}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {evento.titulo}
                  </Typography>
                  <Typography variant="body2">
                    {evento.descripcion}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Box>
</section>

      {/* Mapa institucional */}
      <Box sx={{ px: 4, pb: 6, maxWidth: '1080px', mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }} align="center">
          Nuestra Presencia en Ecuador
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <img
            src="/imagenes/mapa.png"
            alt="Mapa institucional"
            style={{
              width: '100%',
              maxWidth: '720px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          />
          <Typography variant="body1" align="center" sx={{ maxWidth: '600px' }}>
            Operamos en Ecuador, Perú, Colombia y México, conectando soluciones agrícolas, pecuarias y ambientales con miles de productores. Nuestra red de distribución crece contigo.
          </Typography>
        </Box>
      </Box>

      {/* Footer institucional */}
      <Box sx={{ backgroundColor: '#2c2b2bff', color: 'white', px: 4, py: 6, mt: 8 }}>
        <Grid container spacing={4}>
          {/* Contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>FreshRootz</Typography>
            <Typography variant="body2">General Córdova No. 623 y Padre Solano</Typography>
            <Typography variant="body2">Guayaquil - Ecuador</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>📞 (593 - 4) 3703870 / 2560400</Typography>
            <Typography variant="body2">✉️ info@FreshRootz.com.ec</Typography>
          </Grid>

          {/* Navegación */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  NOSOTROS
                </Typography>
                {['Quiénes somos', 'Nuestra historia', 'Certificaciones', 'Responsabilidad', 'Contáctanos'].map((link, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    {link}
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  SERVICIOS
                </Typography>
                {['Facturación electrónica', 'Consulta técnica', 'Pedidos en línea', 'Preguntas frecuentes'].map((link, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    {link}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Suscripción */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>💬 SUSCRÍBETE</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Recibe nuestras noticias y novedades directo en tu correo.
            </Typography>
            <Box component="form" sx={{ display: 'flex', gap: 1 }}>
              <input type="email" placeholder="Tu correo" style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '0.875rem'
              }} />
              <button type="submit" style={{
                padding: '8px 16px',
                backgroundColor: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}>
                Enviar
              </button>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
}