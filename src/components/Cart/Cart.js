import React from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap'; // Añade Form aquí
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useSeo } from '../../hooks/useSeo';
import CartItem from './CartItem';

/**
 * Componente principal del carrito de compras
 */
const Cart = () => {
  const { cart, clearCart, getCartTotal, getCartItemsCount } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  // Configuración SEO para la página del carrito
  useSeo({
    title: 'Carrito de Compras - MiTienda',
    description: `Tu carrito de compras con ${getCartItemsCount()} productos. Revisa y finaliza tu compra.`,
    keywords: 'carrito, compras, checkout, productos seleccionados',
    noindex: true // No indexar páginas de carrito
  });

  const handleCheckout = () => {
    if (!usuario) {
      alert('Por favor inicia sesión para continuar con la compra');
      navigate('/login', { state: { from: '/carrito' } });
      return;
    }

    if (cart.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    // Aquí iría la lógica para procesar el pago
    alert('¡Gracias por tu compra! Esta es una simulación.');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5 mt-5">
        <div className="text-center py-5">
          <div className="mb-4" style={{ fontSize: '5rem' }}>🛒</div>
          <h2 className="mb-3">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">
            Parece que aún no has agregado productos a tu carrito.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/productos')}
          >
            Explorar Productos
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5 mt-5">
      <h1 className="mb-4">Carrito de Compras</h1>
      
      <Row>
        {/* Lista de productos */}
        <Col lg={8}>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                Productos ({getCartItemsCount()} {getCartItemsCount() === 1 ? 'producto' : 'productos'})
              </h5>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={clearCart}
              >
                Vaciar Carrito
              </Button>
            </div>
            
            {/* Lista de items del carrito */}
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Continuar comprando */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="text-center">
              <p className="mb-3">¿Quieres agregar más productos?</p>
              <Button 
                variant="outline-primary"
                onClick={() => navigate('/productos')}
              >
                ← Continuar Comprando
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Resumen del pedido */}
        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '100px' }}>
            <Card.Header className="bg-light">
              <h5 className="mb-0">Resumen del Pedido</h5>
            </Card.Header>
            <Card.Body>
              {/* Detalles del resumen */}
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({getCartItemsCount()} productos)</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío</span>
                  <span className="text-success">Gratis</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Impuestos</span>
                  <span>${(getCartTotal() * 0.21).toFixed(2)}</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between fw-bold h5">
                  <span>Total</span>
                  <span>${(getCartTotal() * 1.21).toFixed(2)}</span>
                </div>
              </div>

              {/* Promoción */}
              <div className="mb-4">
                <Form.Group>
                  <Form.Label className="small">Código de descuento</Form.Label>
                  <div className="input-group">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingresa código"
                    />
                    <Button variant="outline-secondary">
                      Aplicar
                    </Button>
                  </div>
                </Form.Group>
              </div>

              {/* Botón de checkout */}
              <Button 
                variant="primary" 
                size="lg"
                className="w-100 mb-3"
                onClick={handleCheckout}
              >
                Proceder al Pago
              </Button>

              {/* Info adicional */}
              <div className="text-center">
                <p className="small text-muted mb-2">
                  ✅ Pago 100% seguro
                </p>
                <p className="small text-muted mb-0">
                  🔒 Tus datos están protegidos
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Información de envío */}
          <Card className="shadow-sm mt-4">
            <Card.Body>
              <h6 className="mb-3">🚚 Información de Envío</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">• Envío gratis en compras mayores a $50</li>
                <li className="mb-2">• Entrega en 3-5 días hábiles</li>
                <li className="mb-2">• Seguimiento online incluido</li>
                <li>• Devoluciones gratis en 30 días</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;