import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/**
 * Componente de inicio de sesión
 * Maneja autenticación de usuarios con diferentes roles
 */
const Login = () => {
  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la ruta a la que redirigir después del login
  const from = location.state?.from?.pathname || '/';

  /**
   * Manejar cambio en los campos del formulario
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  /**
   * Manejar envío del formulario de login
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!credenciales.email || !credenciales.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setCargando(true);
    setError('');

    try {
      // Intentar login
      const exito = login(credenciales.email, credenciales.password);
      
      if (exito) {
        // Redirigir a la página solicitada o al home
        navigate(from, { replace: true });
      } else {
        setError('Credenciales incorrectas. Por favor verifica tu email y contraseña.');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  /**
   * Cargar credenciales de demo según el rol
   */
  const cargarDemo = (rol) => {
    const demos = {
      administrador: { email: 'admin@tienda.com', password: 'admin123' },
      gerente: { email: 'gerente@tienda.com', password: 'gerente123' },
      vendedor: { email: 'vendedor@tienda.com', password: 'vendedor123' },
      cliente: { email: 'cliente@tienda.com', password: 'cliente123' }
    };
    
    setCredenciales(demos[rol]);
  };

  return (
    <>
      {/* Meta tags para SEO */}
      <Helmet>
        <title>Iniciar Sesión - MiTienda</title>
        <meta name="description" content="Inicia sesión en MiTienda para acceder a tu cuenta y disfrutar de todos nuestros productos y servicios." />
        <meta name="keywords" content="login, iniciar sesión, mi cuenta, tienda online" />
      </Helmet>

      <Container className="py-5 mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} xl={5}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                
                {/* Mensaje de error */}
                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                {/* Formulario de login */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={credenciales.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={credenciales.password}
                      onChange={handleChange}
                      placeholder="Tu contraseña"
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={cargando}
                  >
                    {cargando ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                  </Button>
                </Form>

                {/* Demos rápidos para testing */}
                <div className="mt-4">
                  <h6 className="text-muted text-center mb-3">Demos Rápidos:</h6>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {['administrador', 'gerente', 'vendedor', 'cliente'].map(rol => (
                      <Button
                        key={rol}
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => cargarDemo(rol)}
                        className="text-capitalize"
                      >
                        {rol}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;