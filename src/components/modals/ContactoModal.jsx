import React from 'react';
import {
  Modal,
  Fade,
  Box,
  IconButton,
  Typography
} from '@mui/material';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CloseIcon from '@mui/icons-material/Close';
import ContactoForm from '../forms/ContactoForm';

export default function ContactoModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-contacto"
      aria-describedby="contacto-accessible"
      closeAfterTransition
    >
      <Fade in={open}>
        <Box
          role="dialog"
          aria-modal="true"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            width: { xs: '90%', sm: 520 },
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 24,
            outline: 0,
            backgroundImage: 'linear-gradient(135deg, #e3f2fd, #e8f5e9)',
            transition: 'all 0.4s ease'
          }}
        >
          {/* Encabezado visual tropical */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ContactSupportIcon sx={{ color: '#2e7d32' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                Contáctanos
              </Typography>
            </Box>
            <IconButton onClick={onClose} aria-label="Cerrar formulario de contacto">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Formulario */}
          <ContactoForm onClose={onClose} />
        </Box>
      </Fade>
    </Modal>
  );
}
