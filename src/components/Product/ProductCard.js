// En src/components/Product/ProductCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      marca: producto.marca,
      imagen: producto.imagen,
      descripcion: producto.descripcion
    });
    
    toast.success(`✅ ${producto.nombre} agregado al carrito!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <Card className="h-100 shadow-sm product-card">
      <Link to={`/producto/${producto.id}`} className="text-decoration-none">
        <div className="product-image" style={{
          height: '200px',
          backgroundImage: `url(${producto.imagen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
      </Link>
      
      <Card.Body className="d-flex flex-column">
        <Link to={`/producto/${producto.id}`} className="text-decoration-none text-dark">
          <Card.Title>{producto.nombre}</Card.Title>
        </Link>
        
        <Card.Text className="text-muted mb-2">
          <small>Categoría: {producto.categoria}</small>
        </Card.Text>
        
        <Card.Text className="h4 text-primary mt-auto mb-3">
          ${producto.precio}
        </Card.Text>
        
        <div className="d-grid gap-2">
          <Link to={`/producto/${producto.id}`}>
            <Button variant="primary" className="w-100">
              Ver Detalles
            </Button>
          </Link>
          
          <Button 
            variant="success"
            onClick={handleAddToCart}
          >
            🛒 Agregar al Carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;