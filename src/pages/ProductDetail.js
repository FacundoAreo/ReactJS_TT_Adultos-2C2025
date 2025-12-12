// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { useSeo } from '../hooks/useSeo';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Datos de productos
  const productosDB = [
    { 
      id: 1, 
      nombre: 'Girgola fresca', 
      precio: 999, 
      categoria: 'fresco',
      descripcion: 'Girgola fresca, lista para consumir.',
      imagen: 'https://cdn0.uncomo.com/es/posts/7/1/5/como_cocinar_las_girgolas_3517_600_square.jpg',
      marca: 'Pleurotus Ostreatus',
      stock: 15,
      rating: 4.8,
      especificaciones: ['venta por peso', 'gris']
    },
    { 
      id: 2, 
      nombre: 'Girgola seca', 
      precio: 499, 
      categoria: 'seco',
      descripcion: 'Girgola deshidrata, seca, lista para usar.',
      imagen: 'https://via.placeholder.com/600x400/28a745/ffffff?text=Smartphone+Ultra',
      marca: 'Pleurotus Ostreatus',
      stock: 30,
      rating: 4.5,
      especificaciones: ['venta por peso', 'gris']
    },
    { 
      id: 3, 
      nombre: 'Champiñon fresco', 
      precio: 499, 
      categoria: 'fresco',
      descripcion: 'Champiñon fresco, lista para usar.',
      imagen: 'https://via.placeholder.com/600x400/28a745/ffffff?text=Smartphone+Ultra',
      marca: 'Agaricus campestri',
      stock: 30,
      rating: 4.5,
      especificaciones: ['venta por peso', 'gris']
    },
    { 
      id: 4, 
      nombre: 'Champiñon seco', 
      precio: 499, 
      categoria: 'seco',
      descripcion: 'Champiñon seco deshidrata, seca, lista para usar.',
      imagen: 'https://via.placeholder.com/600x400/28a745/ffffff?text=Smartphone+Ultra',
      marca: 'Agaricus campestri',
      stock: 30,
      rating: 4.5,
      especificaciones: ['venta por peso', 'gris']
    },
    { 
      id: 5, 
      nombre: 'Portobelo fresco', 
      precio: 499, 
      categoria: 'fresco',
      descripcion: 'Portobelo fresco, lista para usar.',
      imagen: 'https://via.placeholder.com/600x400/28a745/ffffff?text=Smartphone+Ultra',
      marca: 'Agaricus campestri',
      stock: 30,
      rating: 4.5,
      especificaciones: ['venta por peso', 'gris']
    },
    { 
      id: 6, 
      nombre: 'Portobelo seco', 
      precio: 499, 
      categoria: 'seco',
      descripcion: 'Portobelo seco deshidrata, seca, lista para usar.',
      imagen: 'https://via.placeholder.com/600x400/28a745/ffffff?text=Smartphone+Ultra',
      marca: 'Agaricus campestri',
      stock: 30,
      rating: 4.5,
      especificaciones: ['venta por peso', 'gris']
    },
    // ... más productos
  ];

  // ✅ Configurar SEO DINÁMICAMENTE basado en el producto
  const seoConfig = producto 
    ? {
        title: `${producto.nombre} - UNQuirGolas`,
        description: producto.descripcion,
        keywords: `${producto.nombre}, ${producto.categoria}, ${producto.marca}, comprar online`,
        image: producto.imagen
      }
    : {
        title: 'Producto - UNQuirGolas',
        description: 'Detalles del producto en UNQuirGolas. Los mejores productos al mejor precio.',
        keywords: 'producto, detalles, tienda online'
      };

  // ✅ LLAMAR AL HOOK EN EL NIVEL SUPERIOR
  useSeo(seoConfig);

  useEffect(() => {
    const cargarProducto = async () => {
      setCargando(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const encontrado = productosDB.find(p => p.id === parseInt(id));
      setProducto(encontrado);
      
      setCargando(false);
    };

    cargarProducto();
  }, [id]);

  const handleAgregarCarrito = () => {
    if (producto) {
      console.log(`Agregando ${producto.nombre} al carrito`);
      alert(`¡${producto.nombre} agregado al carrito!`);
      // Aquí iría la lógica real para agregar al carrito
    }
  };

  if (cargando) {
    return (
      <Container className="py-5 mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando producto...</p>
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="py-5 mt-5">
        <Alert variant="warning">
          <Alert.Heading>Producto No Encontrado</Alert.Heading>
          <p>El producto que buscas no existe o ha sido eliminado.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-primary" onClick={() => navigate('/productos')}>
              Volver a Productos
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5 mt-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/productos">Productos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      <Row>
        {/* Imagen del producto */}
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm">
            <div 
              className="product-detail-image"
              style={{
                height: '400px',
                backgroundImage: `url(${producto.imagen})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </Card>
        </Col>

        {/* Información del producto */}
        <Col lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Badge bg="info" className="mb-2">{producto.categoria}</Badge>
              <h1 className="h2 mb-3">{producto.nombre}</h1>
              
              <div className="mb-3">
                <span className="text-muted">Marca: </span>
                <strong>{producto.marca}</strong>
              </div>

              <div className="mb-4">
                <span className="h3 text-primary">${producto.precio}</span>
                {producto.stock > 0 ? (
                  <Badge bg="success" className="ms-3">
                    ✅ En stock
                  </Badge>
                ) : (
                  <Badge bg="danger" className="ms-3">
                    ❌ Sin stock
                  </Badge>
                )}
              </div>

              <p className="lead mb-4">{producto.descripcion}</p>

              {/* Especificaciones */}
              <div className="mb-4">
                <h5 className="mb-3">📋 Especificaciones</h5>
                <ul className="list-unstyled">
                  {producto.especificaciones.map((spec, index) => (
                    <li key={index} className="mb-2">
                      <span className="text-success me-2">✓</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botones de acción */}
              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleAgregarCarrito}
                  disabled={producto.stock <= 0}
                >
                  🛒 Agregar al Carrito
                </Button>
                
                <Button 
                  variant="outline-secondary"
                  onClick={() => navigate('/productos')}
                >
                  ← Volver a Productos
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;