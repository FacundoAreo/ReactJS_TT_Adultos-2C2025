import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tab, Tabs, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet';
import ProductForm from '../components/Product/ProductForm';

/**
 * Panel de administración con diferentes funcionalidades según el rol
 * Solo accesible para administradores y gerentes
 */
const AdminPanel = () => {
  const { usuario, tieneRol } = useAuth();
  const [activeTab, setActiveTab] = useState('productos');

  // Verificar permisos de acceso
  if (!usuario || (!tieneRol('administrador') && !tieneRol('gerente'))) {
    return (
      <Container className="py-5 mt-5">
        <Alert variant="warning" className="text-center">
          <h4>Acceso Denegado</h4>
          <p>No tienes permisos para acceder al panel de administración.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panel de Administración - MiTienda</title>
        <meta name="description" content="Panel de administración para gestionar productos, usuarios y configuraciones de la tienda." />
      </Helmet>

      <Container className="py-5 mt-5">
        <Row>
          <Col>
            <h1 className="mb-4">Panel de Administración</h1>
            <p className="text-muted">
              Bienvenido, {usuario.nombre}. Rol: <strong>{usuario.rol}</strong>
            </p>
          </Col>
        </Row>

        <Tabs
          activeKey={activeTab}
          onSelect={(tab) => setActiveTab(tab)}
          className="mb-4"
        >
          {/* Pestaña de Gestión de Productos */}
          <Tab eventKey="productos" title="📦 Gestión de Productos">
            <Card>
              <Card.Body>
                <h5>Gestionar Productos</h5>
                <p className="text-muted">
                  Agrega, edita o elimina productos del catálogo.
                </p>
                
                {/* Formulario para agregar productos */}
                <ProductForm />
              </Card.Body>
            </Card>
          </Tab>

          {/* Pestaña de Gestión de Usuarios (solo administrador) */}
          {tieneRol('administrador') && (
            <Tab eventKey="usuarios" title="👥 Gestión de Usuarios">
              <Card>
                <Card.Body>
                  <h5>Gestión de Usuarios</h5>
                  <p className="text-muted">
                    Gestiona usuarios y permisos del sistema.
                  </p>
                  
                  <Button variant="outline-primary">
                    Ver Lista de Usuarios
                  </Button>
                </Card.Body>
              </Card>
            </Tab>
          )}

          {/* Pestaña de Reportes */}
          {(tieneRol('administrador') || tieneRol('gerente')) && (
            <Tab eventKey="reportes" title="📊 Reportes">
              <Card>
                <Card.Body>
                  <h5>Reportes y Estadísticas</h5>
                  <p className="text-muted">
                    Visualiza reportes de ventas y métricas del negocio.
                  </p>
                  
                  <div className="d-flex gap-2 flex-wrap">
                    <Button variant="outline-success">
                      Reporte de Ventas
                    </Button>
                    <Button variant="outline-info">
                      Métricas de Productos
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Tab>
          )}
        </Tabs>
      </Container>
    </>
  );
};

export default AdminPanel;