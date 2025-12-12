import React from 'react';
import { Container, Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useSeo } from '../hooks/useSeo';

/**
 * Componente de perfil de usuario
 * Muestra información del usuario y sus pedidos
 */
const Profile = () => {
  const { usuario, logout } = useAuth();

  // ✅ MOVER useSeo FUERA de cualquier condición
  // Siempre se llama, pero ajustamos los parámetros según el estado
  const seoConfig = usuario 
    ? {
        title: `Perfil de ${usuario.nombre} - UNQuirGolas`,
        description: `Gestión de cuenta de ${usuario.nombre} en UNQuirGolas. Ver pedidos, datos personales y configuración.`,
        keywords: `perfil usuario, mis pedidos, cuenta, ${usuario.nombre}`,
        noindex: true
      }
    : {
        title: 'Perfil - UNQuirGolas',
        description: 'Accede a tu perfil para gestionar tus datos y pedidos en UNQuirGolas.',
        keywords: 'perfil, cuenta usuario, mis pedidos',
        noindex: true
      };

  // ✅ LLAMAR AL HOOK SIEMPRE, en el nivel superior
  useSeo(seoConfig);

  // Si no hay usuario, mostrar mensaje
  if (!usuario) {
    return (
      <Container className="py-5 mt-5 text-center">
        <h3>Por favor inicia sesión para ver tu perfil</h3>
        <Button 
          variant="primary" 
          href="/login"
          className="mt-3"
        >
          Iniciar Sesión
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5 mt-5">
      <Row>
        <Col lg={4} className="mb-4">
          {/* Tarjeta de información del usuario */}
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-3">
                <div 
                  className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center" 
                  style={{ width: '100px', height: '100px' }}
                >
                  <span className="text-white h3">
                    {usuario.nombre.charAt(0)}
                  </span>
                </div>
              </div>
              
              <h4>{usuario.nombre}</h4>
              <Badge bg={usuario.rol === 'administrador' ? 'danger' : 'info'} className="mb-3">
                {usuario.rol}
              </Badge>
              
              <p className="text-muted">
                <strong>Email:</strong> {usuario.email}
              </p>
              
              <Button 
                variant="outline-danger" 
                onClick={logout}
                className="w-100"
              >
                Cerrar Sesión
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {/* Sección de pedidos recientes */}
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">📦 Mis Pedidos Recientes</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-4 text-muted">
                <p>No tienes pedidos recientes</p>
                <Button variant="primary" href="/productos">
                  Comenzar a Comprar
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Sección de información de cuenta */}
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">⚙️ Configuración de Cuenta</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <h6>Datos Personales</h6>
                  <Button variant="outline-secondary" size="sm" disabled>
                    Editar Perfil
                  </Button>
                </Col>
                
                <Col md={6} className="mb-3">
                  <h6>Seguridad</h6>
                  <Button variant="outline-secondary" size="sm" disabled>
                    Cambiar Contraseña
                  </Button>
                </Col>
                
                <Col md={6} className="mb-3">
                  <h6>Notificaciones</h6>
                  <Button variant="outline-secondary" size="sm" disabled>
                    Preferencias
                  </Button>
                </Col>
                
                <Col md={6} className="mb-3">
                  <h6>Direcciones</h6>
                  <Button variant="outline-secondary" size="sm" disabled>
                    Gestionar Direcciones
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;