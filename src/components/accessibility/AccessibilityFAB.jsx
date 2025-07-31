import React from 'react';
import {
  Box,
  Fab,
  Drawer,
  Typography,
  Grid,
  IconButton
} from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ContrastIcon from '@mui/icons-material/Tonality';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import AnimationIcon from '@mui/icons-material/MotionPhotosOff';
import LinkIcon from '@mui/icons-material/Link';
import MouseIcon from '@mui/icons-material/Mouse';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';
import ControlNivelVisual from './ControlNivelVisual';
import { useAccessibility } from '../../context/AccessibilityContext';

export default function AccessibilityFAB() {
  const location = useLocation();
  const {
    panelAbierto,
    setPanelAbierto,
    toggleContraste,
    toggleDislexia,
    aumentarTexto,
    disminuirTexto,
    toggleOcultarImágenes,
    toggleResaltarEnlaces,
    toggleAnimaciones,
    toggleModoLupa,
    toggleInvertirColores,
    leerTexto,
    detenerLectura,
    espaciadoNivel,
    setEspaciadoNivel,
    alturaLinea,
    setAlturaLinea,
    altoContraste,
    modoDislexia,
    ocultarImágenes,
    resaltarEnlaces,
    detenerAnimaciones,
    modoLupa,
    invertirColores
  } = useAccessibility();


  React.useEffect(() => {
    setPanelAbierto(false);
    detenerLectura();
  }, [location.pathname]);

  return (
    <>
      <Fab
        onClick={() => setPanelAbierto(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: '#000',
          color: '#fff',
          zIndex: 1300,
          display: panelAbierto ? 'none' : 'flex',
          '&:hover': { bgcolor: '#333' }
        }}
        aria-label="Accesibilidad"
      >
        <AccessibilityNewIcon fontSize="large" />
      </Fab>

      <Drawer
        anchor="right"
        open={panelAbierto}
        onClose={() => setPanelAbierto(false)}
        PaperProps={{
          sx: {
            width: 360,
            p: 2,
            backgroundColor: '#fff',
            height: '100vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <Box>
          {}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={() => setPanelAbierto(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="h6" gutterBottom>
            Menú de Accesibilidad
          </Typography>

          {}
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
            👁️ Visual
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}><IconBox icon={<ContrastIcon />} label="Alto contraste" active={altoContraste} onClick={toggleContraste} /></Grid>
            <Grid item xs={6}><IconBox icon={<InvertColorsIcon />} label="Invertir colores" active={invertirColores} onClick={toggleInvertirColores} /></Grid>
            <Grid item xs={6}><IconBox icon={<ImageIcon />} label="Ocultar imágenes" active={ocultarImágenes} onClick={toggleOcultarImágenes} /></Grid>
            <Grid item xs={6}><IconBox icon={<LinkIcon />} label="Resaltar enlaces" active={resaltarEnlaces} onClick={toggleResaltarEnlaces} /></Grid>
          </Grid>

          {}
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
            🔠 Texto
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}><IconBox icon={<TextFieldsIcon />} label="Aumentar texto" onClick={aumentarTexto} /></Grid>
            <Grid item xs={6}><IconBox icon={<TextFieldsIcon />} label="Reducir texto" onClick={disminuirTexto} /></Grid>
          </Grid>

          <ControlNivelVisual label="Espaciado de texto" state={espaciadoNivel} setState={setEspaciadoNivel} />
          <ControlNivelVisual label="Altura de línea" state={alturaLinea} setState={setAlturaLinea} />

          {}
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
            🧠 Cognitiva
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}><IconBox icon={<PsychologyIcon />} label="Tipografía dislexia" active={modoDislexia} onClick={toggleDislexia} /></Grid>
            <Grid item xs={6}><IconBox icon={<AnimationIcon />} label="Detener animaciones" active={detenerAnimaciones} onClick={toggleAnimaciones} /></Grid>
            <Grid item xs={6}><IconBox icon={<VolumeUpIcon />} label="Leer pantalla" onClick={() => leerTexto(document.body.innerText.slice(0, 500))} /></Grid>
            <Grid item xs={6}><IconBox icon={<StopCircleIcon />} label="Detener lectura" onClick={detenerLectura} /></Grid>
          </Grid>

          {}
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
            🧭 Navegación
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}><IconBox icon={<MouseIcon />} label="Modo lupa" active={modoLupa} onClick={toggleModoLupa} /></Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}

function IconBox({ icon, label, onClick, active }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        backgroundColor: active ? '#d0f0e0' : '#f5f5f5',
        borderRadius: 2,
        border: active ? '2px solid #26a69a' : '1px solid #ddd',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          backgroundColor: '#e0f7fa',
          borderColor: '#26a69a'
        }
      }}
    >
      <IconButton color={active ? 'success' : 'primary'} size="large">
        {icon}
      </IconButton>
      <Typography variant="caption" align="center" sx={{ mt: 1 }}>
        {label}
      </Typography>
    </Box>
  );
}
