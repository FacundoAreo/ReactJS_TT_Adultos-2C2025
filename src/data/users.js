/**
 * Base de datos simulada de usuarios con diferentes roles y privilegios
 */
export const usuarios = [
  {
    id: 1,
    nombre: 'Administrador Principal',
    email: 'admin@tienda.com',
    password: 'admin123',
    rol: 'administrador',
    // El administrador tiene acceso completo
  },
  {
    id: 2,
    nombre: 'Gerente de Ventas',
    email: 'gerente@tienda.com',
    password: 'gerente123',
    rol: 'gerente',
    // El gerente puede gestionar productos pero no usuarios
  },
  {
    id: 3,
    nombre: 'Vendedor Ejemplo',
    email: 'vendedor@tienda.com',
    password: 'vendedor123',
    rol: 'vendedor',
    // El vendedor solo puede ver productos y gestionar ventas
  },
  {
    id: 4,
    nombre: 'Cliente Premium',
    email: 'cliente@tienda.com',
    password: 'cliente123',
    rol: 'cliente',
    // El cliente solo puede comprar y ver su perfil
  }
];

/**
 * Obtener todos los usuarios (solo para administrador)
 */
export const obtenerUsuarios = () => {
  return usuarios.map(({ password, ...usuario }) => usuario);
};

/**
 * Verificar credenciales de usuario
 */
export const verificarCredenciales = (email, password) => {
  return usuarios.find(user => user.email === email && user.password === password);
};