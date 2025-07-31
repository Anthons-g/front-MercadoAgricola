import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import RegistroForm from './components/forms/RegistroForm';
import ContactoForm from './components/forms/ContactoForm';
import LoginForm from './components/forms/LoginForm';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import AccessibilityFAB from './components/accessibility/AccessibilityFAB'; 
import PantallaInicio from './pages/PantallaInicio';
import Banano from './pages/productos/Banano';
import Comprar from './pages/compras/Comprar';
import ProductoForm from './components/forms/ProductoForm'; 
import EditarProductoForm from './components/forms/EditarProductoForm';
import EliminarProducto from './components/forms/EliminarProducto'; 
import Acuacultura from './pages/productos/Acuacultura';
import Detalle from './pages/productos/detalle';
import Agricola from './pages/productos/Agricola';
import Fertilizantes from './pages/productos/Fertilizantes';
import Larvicultura from './pages/productos/Larvicultura';
import Mascotas from './pages/productos/Mascotas';
import Quimicos from './pages/productos/Quimicos';
import SaludAnimal from './pages/productos/SaludAnimal';
import SaludPublica from './pages/productos/SaludPublica';
import Semillas from './pages/productos/Semillas';
import FormularioServicio from './pages/FormularioServicio';
import FormularioCapacitacion from './pages/FormularioCapacitacion';

function AppRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/comprar';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<PantallaInicio />} />
        <Route path="/registro" element={<RegistroForm />} />
        <Route path="/contacto" element={<ContactoForm />} />
        <Route path="/producto" element={<ProductoForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/inicio" element={<PantallaInicio />} />
        <Route path="/productos/Acuacultura" element={<Acuacultura />} />
        <Route path="/productos/Banano" element={<Banano />} />
        <Route path="/productos/detalle/:categoria/:id" element={<Detalle />} />
        <Route path="/comprar" element={<Comprar />} />
        <Route path="/productos/nuevo" element={<ProductoForm />} />
        <Route path="/productos/editar/:id" element={<EditarProductoForm />} />
        <Route path="/productos/eliminar/:id" element={<EliminarProducto />} />
        <Route path="/productos/Agricola" element={<Agricola />} />
        <Route path="/productos/Fertilizantes" element={<Fertilizantes />} />
        <Route path="/productos/Larvicultura" element={<Larvicultura />} />
        <Route path="/productos/Mascotas" element={<Mascotas />} />
        <Route path="/productos/Quimicos" element={<Quimicos />} />
        <Route path="/productos/SaludAnimal" element={<SaludAnimal />} />
        <Route path="/productos/SaludPublica" element={<SaludPublica />} />
        <Route path="/productos/Semillas" element={<Semillas />} />
        <Route path="/servicios" element={<FormularioServicio />} />
        <Route path="/capacitacion" element={<FormularioCapacitacion />} />
      </Routes>
      <AccessibilityFAB />
    </>
  );
}

function App() {
  return (
    <AuthProvider> 
      <AccessibilityProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AccessibilityProvider>
    </AuthProvider>
  );
}

export default App;
