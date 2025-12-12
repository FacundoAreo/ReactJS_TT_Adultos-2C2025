import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';

/**
 * Componente para mostrar un item individual del carrito
 */
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleIncrement = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const subtotal = item.precio * item.quantity;

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          {/* Imagen */}
          <Col xs={3} md={2}>
            <div 
              className="cart-item-image rounded"
              style={{
                width: '80px',
                height: '80px',
                backgroundImage: `url(${item.imagen || 'https://via.placeholder.com/80/007bff/ffffff?text=Producto'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </Col>

          {/* Información del producto */}
          <Col xs={9} md={5}>
            <h6 className="mb-1">{item.nombre}</h6>
            <p className="text-muted mb-1 small">
              {item.marca || 'Sin marca'} • {item.categoria || 'Sin categoría'}
            </p>
            <p className="text-primary mb-0 fw-bold">
              ${item.precio.toFixed(2)}
            </p>
          </Col>

          {/* Selector de cantidad */}
          <Col xs={6} md={3}>
            <div className="d-flex align-items-center">
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={handleDecrement}
                style={{ width: '35px' }}
              >
                -
              </Button>
              
              <Form.Control
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="mx-2 text-center"
                style={{ width: '60px' }}
              />
              
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={handleIncrement}
                style={{ width: '35px' }}
              >
                +
              </Button>
            </div>
          </Col>

          {/* Subtotal y acciones */}
          <Col xs={6} md={2} className="text-end">
            <p className="fw-bold h6 mb-2">
              ${subtotal.toFixed(2)}
            </p>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => removeFromCart(item.id)}
              className="w-100"
            >
              Eliminar
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;