import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem('usuarioMercado');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('%c[Auth] Usuario cargado desde localStorage', 'color: green');
    }
  }, []);

  const login = (data) => {
    setUser(data);
    localStorage.setItem('usuarioMercado', JSON.stringify(data));
    console.log('%c[Auth] Usuario logueado:', 'color: blue', data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('usuarioMercado');
    console.log('%c[Auth] Usuario deslogueado', 'color: red');
  };

  const isAdmin = user?.rol === 'admin';
  const isCliente = user?.rol === 'cliente'; 

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isCliente }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
