import React, { createContext, useContext, useState, useEffect } from 'react';
import { usuarios } from '../data/users';

// Crear contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Verificar si hay usuario logueado al cargar la app
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  /**
   * Función para iniciar sesión
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {boolean} - True si el login es exitoso
   */
  const login = (email, password) => {
    // Buscar usuario en la base de datos simulada
    const usuarioEncontrado = usuarios.find(
      user => user.email === email && user.password === password
    );

    if (usuarioEncontrado) {
      // Remover password por seguridad antes de guardar
      const { password: _, ...usuarioSinPassword } = usuarioEncontrado;
      setUsuario(usuarioSinPassword);
      localStorage.setItem('usuario', JSON.stringify(usuarioSinPassword));
      return true;
    }
    return false;
  };

  /**
   * Función para cerrar sesión
   */
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  /**
   * Verificar si el usuario tiene un rol específico
   * @param {string} rol - Rol a verificar
   * @returns {boolean} - True si el usuario tiene el rol
   */
  const tieneRol = (rol) => {
    return usuario?.rol === rol;
  };

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean} - True si el usuario está logueado
   */
  const estaAutenticado = () => {
    return usuario !== null;
  };

  const value = {
    usuario,
    cargando,
    login,
    logout,
    tieneRol,
    estaAutenticado
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};