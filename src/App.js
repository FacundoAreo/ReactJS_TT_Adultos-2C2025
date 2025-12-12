import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import NavigationBar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './components/Auth/Login';
import AdminPanel from './pages/Admin';
import Profile from './pages/Profile';
import Cart from './components/Cart/Cart';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

/**
 * Componente protegido que verifica autenticación
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { usuario, tieneRol } = useAuth();
  
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && !tieneRol(requiredRole)) {
    return (
      <Container className="py-5 mt-5">
        <div className="alert alert-warning text-center">
          <h4>Acceso Denegado</h4>
          <p>No tienes permisos para acceder a esta página.</p>
        </div>
      </Container>
    );
  }
  
  return children;
};

/**
 * Componente principal de la aplicación
 */
function AppContent() {
  return (
    <>
      {/* Configuración global de React Helmet */}
      <Helmet>
        <title>MiTienda - Tu tienda online de confianza</title>
        <meta name="description" content="Descubre los mejores productos al mejor precio. Envío gratis en compras mayores a $50." />
        <meta name="keywords" content="tienda online, ecommerce, compras, productos, tecnología" />
        <meta property="og:title" content="MiTienda - Ecommerce" />
        <meta property="og:description" content="Los mejores productos al mejor precio" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Router>
        {/* Navbar responsive */}
        <NavigationBar />
        
        {/* Contenido principal con padding para el navbar fixed */}
        <main className="main-content">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carrito" element={<Cart />} />
            
            {/* Rutas protegidas */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="administrador">
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/perfil" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </Router>
      
      {/* Contenedor de notificaciones Toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

/**
 * Componente raíz de la aplicación con todos los providers
 */
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;