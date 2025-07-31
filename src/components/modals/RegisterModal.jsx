import React from 'react';
import {
  Modal,
  Fade,
  Box,
  IconButton,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RegisterForm from '../forms/RegisterForm';

export default function RegisterModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-registro"
      aria-describedby="registro-accessible"
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
            backgroundImage: 'linear-gradient(135deg, #f5f5f5, #e8f5e9)',
            transition: 'all 0.4s ease'
          }}
        >
          {/* Encabezado institucional */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
              ¡Crea tu cuenta!
            </Typography>
            <IconButton onClick={onClose} aria-label="Cerrar registro">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Formulario tropicalizado */}
          <RegisterForm onClose={onClose} />
        </Box>
      </Fade>
    </Modal>
  );
}
