// src/pages/Products.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSeo } from '../hooks/useSeo';
import ProductCard from '../components/Product/ProductCard';

const Products = () => {
  useSeo({
    title: 'Productos - UNQuirGolas',
    description: 'Explora nuestro catálogo de productos. Hongos comestibles y medicinales en diversas preparaciones.',
    keywords: 'productos, catálogo, tienda online, compras'
  });

  const productos = [
    { id: 1, nombre: 'Girgola fresca', precio: 999, categoria: 'fresco', imagen: 'https://via.placeholder.com/300x200/007bff/ffffff?text=Laptop' },
    { id: 2, nombre: 'Girgola seca', precio: 499, categoria: 'seco', imagen: 'https://via.placeholder.com/300x200/28a745/ffffff?text=Smartphone' },
    { id: 3, nombre: 'Champiñon fesco', precio: 89, categoria: 'fresco', imagen: 'https://via.placeholder.com/300x200/17a2b8/ffffff?text=Auriculares' },
    { id: 4, nombre: 'Champiñon seco', precio: 450, categoria: 'seco', imagen: 'https://via.placeholder.com/300x200/ffc107/000000?text=Sofá' },
    { id: 5, nombre: 'Portobelo fesco', precio: 200, categoria: 'fresco', imagen: 'https://via.placeholder.com/300x200/6c757d/ffffff?text=Mesa' },
    { id: 6, nombre: 'Portobelo seco', precio: 25, categoria: 'seco', imagen: 'https://via.placeholder.com/300x200/dc3545/ffffff?text=Camiseta' },
  ];

  return (
    <Container className="py-5 mt-5">
      <h1 className="mb-4">Nuestros Productos</h1>
      <p className="lead mb-5">Descubre nuestra amplia selección de productos</p>
      
      <Row>
        {productos.map(producto => (
          <Col key={producto.id} md={4} className="mb-4">
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;