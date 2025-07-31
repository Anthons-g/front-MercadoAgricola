import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [altoContraste, setAltoContraste] = useState(false);
  const [modoDislexia, setModoDislexia] = useState(false);
  const [tamañoTexto, setTamañoTexto] = useState(1);
  const [ocultarImágenes, setOcultarImágenes] = useState(false);
  const [resaltarEnlaces, setResaltarEnlaces] = useState(false);
  const [detenerAnimaciones, setDetenerAnimaciones] = useState(false);
  const [modoLupa, setModoLupa] = useState(false);
  const [espaciadoNivel, setEspaciadoNivel] = useState('normal');
  const [alturaLinea, setAlturaLinea] = useState('normal');
  const [invertirColores, setInvertirColores] = useState(false);
  const [panelAbierto, setPanelAbierto] = useState(false);


  const toggleContraste = () => setAltoContraste(prev => !prev);
  const toggleDislexia = () => setModoDislexia(prev => !prev);
  const toggleOcultarImágenes = () => setOcultarImágenes(prev => !prev);
  const toggleResaltarEnlaces = () => setResaltarEnlaces(prev => !prev);
  const toggleAnimaciones = () => setDetenerAnimaciones(prev => !prev);
  const toggleModoLupa = () => setModoLupa(prev => !prev);
  const toggleInvertirColores = () => setInvertirColores(prev => !prev);
  const aumentarTexto = () => setTamañoTexto(prev => Math.min(prev + 0.1, 1.6));
  const disminuirTexto = () => setTamañoTexto(prev => Math.max(prev - 0.1, 0.7));

  const leerTexto = (texto) => {
    const speech = new SpeechSynthesisUtterance(texto);
    speech.lang = 'es-ES';
    window.speechSynthesis.speak(speech);
  };

  const detenerLectura = () => {
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    document.body.style.animation = detenerAnimaciones ? 'none' : '';
    document.body.classList.toggle('resaltar-enlaces', resaltarEnlaces);
    document.body.classList.toggle('ocultar-imagenes', ocultarImágenes);
    document.body.style.filter = invertirColores ? 'invert(1)' : 'none';
  }, [detenerAnimaciones, resaltarEnlaces, ocultarImágenes, invertirColores]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--espaciado-letra',
      espaciadoNivel === 'medio' ? '0.08em' :
      espaciadoNivel === 'alto' ? '0.15em' :
      '0.02em'
    );
    root.style.setProperty('--altura-linea',
      alturaLinea === 'medio' ? '1.8' :
      alturaLinea === 'alto' ? '2.2' :
      '1.5'
    );
  }, [espaciadoNivel, alturaLinea]);

  useEffect(() => {
    let lupa;
    if (modoLupa) {
      lupa = document.createElement('div');
      lupa.id = 'lupa-visual';
      Object.assign(lupa.style, {
        position: 'fixed',
        pointerEvents: 'none',
        width: '150px',
        height: '150px',
        overflow: 'hidden',
        borderRadius: '50%',
        border: '2px solid #1976d2',
        boxShadow: '0 0 10px #1976d2',
        zIndex: '9999'
      });
      document.body.appendChild(lupa);
      const zoomer = document.createElement('div');
      Object.assign(zoomer.style, {
        transform: 'scale(2)',
        transformOrigin: 'top left',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0
      });
      zoomer.innerHTML = document.body.innerHTML;
      lupa.appendChild(zoomer);
      const mover = (e) => {
        lupa.style.top = `${e.clientY - 75}px`;
        lupa.style.left = `${e.clientX - 75}px`;
        zoomer.style.left = `-${e.clientX * 2 - 75}px`;
        zoomer.style.top = `-${e.clientY * 2 - 75}px`;
      };
      window.addEventListener('mousemove', mover);
      return () => {
        window.removeEventListener('mousemove', mover);
        lupa.remove();
      };
    }
  }, [modoLupa]);

  const theme = useMemo(() =>
    createTheme({
      typography: {
        htmlFontSize: 16,
        fontSize: 16 * tamañoTexto,
      },
    }), [tamañoTexto]);

  return (
    <AccessibilityContext.Provider value={{
      altoContraste,
      modoDislexia,
      tamañoTexto,
      aumentarTexto,
      disminuirTexto,
      ocultarImágenes,
      resaltarEnlaces,
      detenerAnimaciones,
      modoLupa,
      espaciadoNivel,
      alturaLinea,
      invertirColores,
      setEspaciadoNivel,
      setAlturaLinea,
      toggleContraste,
      toggleDislexia,
      toggleOcultarImágenes,
      toggleResaltarEnlaces,
      toggleAnimaciones,
      toggleModoLupa,
      toggleInvertirColores,
      leerTexto,
      detenerLectura,
      panelAbierto,
      setPanelAbierto

    }}>
      <ThemeProvider theme={theme}>
        <div style={{
          backgroundColor: altoContraste ? '#000' : modoDislexia ? '#f4f1e8' : '#fff',
          color: altoContraste ? '#fff' : '#000',
          fontFamily: modoDislexia ? 'Lexend Deca, Arial, sans-serif' : 'Arial, sans-serif',
          lineHeight: 'var(--altura-linea)',
          letterSpacing: 'var(--espaciado-letra)',
          transition: 'background-color 0.3s ease',
        }}>
          {children}
        </div>
      </ThemeProvider>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
