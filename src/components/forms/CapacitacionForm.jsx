import { useState } from 'react';
import { TextField, MenuItem, Button, Typography, Box } from '@mui/material';

const sectores = ['Costa', 'Andes', 'Amazonía'];
const edades = ['Menor de 18', '18-30', 'Mayor de 30'];
const cursos = {
  Costa: ['Riego eficiente', 'Semillas tropicales'],
  Andes: ['Cultivo en altura', 'Conservación de suelo'],
  Amazonía: ['Agroforestería', 'Manejo sostenible'],
};

export default function CapacitacionForm() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [sector, setSector] = useState('');
  const [edad, setEdad] = useState('');
  const [curso, setCurso] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !correo || !sector || !edad || !curso) {
      setFeedback('Todos los campos son obligatorios ❌');
      return;
    }

    const payload = { nombre, correo, sector, edad, curso };

    try {
      const res = await fetch('/api/capacitacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setFeedback(data.message || 'Inscripción registrada correctamente ✔️');

      setNombre('');
      setCorreo('');
      setSector('');
      setEdad('');
      setCurso('');
    } catch (err) {
      console.error('Error al enviar inscripción:', err);
      setFeedback('Error al registrar ❌');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Formulario de Capacitación
      </Typography>

      <TextField
        label="Nombres completos"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Correo electrónico"
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        select
        label="Sector"
        value={sector}
        onChange={(e) => setSector(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {sectores.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {edades.map((e) => (
          <MenuItem key={e} value={e}>
            {e}
          </MenuItem>
        ))}
      </TextField>

      {sector && edad && (
        <TextField
          select
          label="Curso disponible"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          fullWidth
          margin="normal"
          required
        >
          {cursos[sector].map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
      )}

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Enviar inscripción
      </Button>

      {feedback && (
        <Typography mt={2} color={feedback.includes('✔️') ? 'success.main' : 'error.main'}>
          {feedback}
        </Typography>
      )}
    </Box>
  );
}
