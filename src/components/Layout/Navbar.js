import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import SearchBar from '../Product/SearchBar';

/**
 * Componente de navegación responsive con menú hamburguesa
 * Implementa diseño Mobile First
 */
const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);
  const { usuario, logout, tieneRol } = useAuth();
  const { getCartItemsCount } = useCart();

  /**
   * Manejar cierre del menú al hacer clic en un enlace
   */
  const handleNavClick = () => {
    setExpanded(false);
  };

  /**
   * Manejar cierre de sesión
   */
  const handleLogout = () => {
    logout();
    handleNavClick();
  };

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className="shadow-sm"
    >
      <Container>
        {/* Logo de la tienda */}
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold">
            🛍️ MiTienda
          </Navbar.Brand>
        </LinkContainer>

        {/* Botón hamburguesa para móvil */}
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="border-0"
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        {/* Contenido del navbar */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menú de navegación principal */}
          <Nav className="me-auto" onClick={handleNavClick}>
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/productos">
              <Nav.Link>Productos</Nav.Link>
            </LinkContainer>

            {/* Menú administrativo solo para administradores y gerentes */}
            {(tieneRol('administrador') || tieneRol('gerente')) && (
              <LinkContainer to="/admin">
                <Nav.Link>Administración</Nav.Link>
              </LinkContainer>
            )}
          </Nav>

          {/* Barra de búsqueda - visible en desktop, oculta en móvil */}
          <div className="d-none d-lg-block me-3" style={{ width: '300px' }}>
            <SearchBar onSearch={handleNavClick} />
          </div>

          {/* Menú de usuario */}
          <Nav onClick={handleNavClick}>
            {/* Icono del carrito */}
            <LinkContainer to="/carrito">
              <Nav.Link className="position-relative">
                🛒 Carrito
                {getCartItemsCount() > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {getCartItemsCount()}
                  </span>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* Menú de usuario o login */}
            {usuario ? (
              <NavDropdown 
                title={`👤 ${usuario.nombre}`} 
                id="user-dropdown"
                align="end"
              >
                <LinkContainer to="/perfil">
                  <NavDropdown.Item>
                    Mi Perfil
                  </NavDropdown.Item>
                </LinkContainer>
                
                <NavDropdown.Divider />
                
                {/* Opciones administrativas */}
                {tieneRol('administrador') && (
                  <>
                    <NavDropdown.Header>Administración</NavDropdown.Header>
                    <LinkContainer to="/admin/usuarios">
                      <NavDropdown.Item>Gestionar Usuarios</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productos">
                      <NavDropdown.Item>Gestionar Productos</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                  </>
                )}

                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>Iniciar Sesión</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;