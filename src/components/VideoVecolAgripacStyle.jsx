import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const VideoVecolAgripacStyle = () => {
  const [subtitlesOn, setSubtitlesOn] = React.useState(true);

  const handleToggleSubtitles = () => {
    setSubtitlesOn((prev) => !prev);
  };

  const videoSrc = `https://www.youtube.com/embed/WQdexfeDjIs?cc_load_policy=${subtitlesOn ? 1 : 0}`;

  return (
    <Box sx={{ px: 4, pb: 6, maxWidth: '1080px', mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }} align="center">
        FreshRootz
      </Typography>

      <Box
        sx={{
          position: 'relative',
          paddingTop: '56.25%',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '2px solid #1976d2',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
          mb: 3
        }}
      >
        <iframe
          src={videoSrc}
          title="Video Corporativo UEN Agrícola – FreshRootz"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
          Al cambiar los subtítulos el video se reiniciará.
        </Typography>
        <Button variant="contained" onClick={handleToggleSubtitles}>
          {subtitlesOn ? 'Desactivar subtítulos' : 'Activar subtítulos'}
        </Button>
      </Box>
      <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', color: 'text.secondary' }}>
        Contamos con un amplio portafolio de insumos de alta calidad para que nuestros agricultores protejan sus cultivos y mejoren su productividad. Ofrecemos alrededor de 500 productos, tales como: abonos foliares, bioestimulantes, bombas, motosierras, reguladores de Ph, fungicidas, insecticidas y productos biológicos. 
      </Typography>
    </Box>
  );
};

export default VideoVecolAgripacStyle;
