import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

/**
 * Componente de formulario para agregar/editar productos
 * Solo accesible para administradores y gerentes
 */
const ProductForm = ({ productoExistente, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: productoExistente?.nombre || '',
    descripcion: productoExistente?.descripcion || '',
    precio: productoExistente?.precio || '',
    categoria: productoExistente?.categoria || '',
    marca: productoExistente?.marca || '',
    stock: productoExistente?.stock || '',
    imagen: productoExistente?.imagen || '',
    sku: productoExistente?.sku || `SKU-${Date.now()}`,
    destacado: productoExistente?.destacado || false
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  /**
   * Validar formulario de producto
   */
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.length < 3) {
      nuevosErrores.nombre = 'Mínimo 3 caracteres';
    }

    if (!formData.descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es obligatoria';
    } else if (formData.descripcion.length < 10) {
      nuevosErrores.descripcion = 'Mínimo 10 caracteres';
    }

    if (!formData.precio) {
      nuevosErrores.precio = 'El precio es obligatorio';
    } else if (isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0';
    }

    if (!formData.categoria) {
      nuevosErrores.categoria = 'La categoría es obligatoria';
    }

    if (!formData.stock) {
      nuevosErrores.stock = 'El stock es obligatorio';
    } else if (!Number.isInteger(Number(formData.stock)) || Number(formData.stock) < 0) {
      nuevosErrores.stock = 'El stock debe ser un número entero no negativo';
    }

    if (!formData.marca.trim()) {
      nuevosErrores.marca = 'La marca es obligatoria';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  /**
   * Manejar cambio en los campos del formulario
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error del campo
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Manejar envío del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      toast.error('Por favor corrige los errores del formulario');
      return;
    }

    setCargando(true);

    try {
      // Simular llamada a API
      const productoData = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        fechaCreacion: new Date().toISOString(),
        rating: 0,
        reviews: 0
      };

      // Aquí iría la llamada real a la API
      console.log('Producto a guardar:', productoData);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Éxito
      toast.success(
        productoExistente 
          ? '✅ Producto actualizado correctamente' 
          : '✅ Producto agregado correctamente'
      );

      // Resetear formulario si es nuevo producto
      if (!productoExistente) {
        setFormData({
          nombre: '',
          descripcion: '',
          precio: '',
          categoria: '',
          marca: '',
          stock: '',
          imagen: '',
          sku: `SKU-${Date.now()}`,
          destacado: false
        });
      }

      // Ejecutar callback de éxito si existe
      if (onSuccess) {
        onSuccess(productoData);
      }

    } catch (error) {
      console.error('Error al guardar producto:', error);
      toast.error('❌ Error al guardar el producto. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h5 className="mb-4">
          {productoExistente ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}
        </h5>

        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Nombre del producto */}
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Nombre del Producto *</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Hongo comestible"
                  isInvalid={!!errores.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.nombre}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Categoría */}
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Categoría *</Form.Label>
                <Form.Select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  isInvalid={!!errores.categoria}
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="fresco">Fresco</option>
                  <option value="seco">Seco</option>
                  <option value="medicinal">Medicinal</option>
                  <option value="preparado">Preparado</option>
                  <option value="extracto">Extracto</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.categoria}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Precio */}
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Precio ($) *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="0.00"
                  isInvalid={!!errores.precio}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.precio}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Stock */}
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Stock *</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  isInvalid={!!errores.stock}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.stock}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Marca */}
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Marca *</Form.Label>
                <Form.Control
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  placeholder="Ej: Pleurotus ostreatus, Agaricus campestri, ,Lentinues Edodes ...."
                  isInvalid={!!errores.marca}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.marca}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* SKU */}
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>SKU</Form.Label>
                <Form.Control
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="Código único del producto"
                  disabled={!!productoExistente}
                />
                <Form.Text className="text-muted">
                  Código único de identificación
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {/* Descripción */}
          <Form.Group className="mb-3">
            <Form.Label>Descripción *</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe detalladamente el producto..."
              isInvalid={!!errores.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {errores.descripcion}
            </Form.Control.Feedback>
          </Form.Group>

          {/* URL de imagen */}
          <Form.Group className="mb-3">
            <Form.Label>URL de Imagen</Form.Label>
            <Form.Control
              type="url"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <Form.Text className="text-muted">
              Dejar vacío para usar imagen por defecto
            </Form.Text>
          </Form.Group>

          {/* Checkbox para producto destacado */}
          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              name="destacado"
              label="Producto Destacado"
              checked={formData.destacado}
              onChange={handleChange}
              className="form-check"
            />
            <Form.Text className="text-muted">
              Los productos destacados aparecen en la página principal
            </Form.Text>
          </Form.Group>

          {/* Resumen de validación */}
          {Object.keys(errores).length > 0 && (
            <Alert variant="danger" className="mb-3">
              <h6>Corrige los siguientes errores:</h6>
              <ul className="mb-0">
                {Object.values(errores).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          {/* Botones de acción */}
          <div className="d-flex gap-2">
            <Button 
              variant="primary" 
              type="submit"
              disabled={cargando}
              className="flex-grow-1"
            >
              {cargando ? 'Guardando...' : (productoExistente ? 'Actualizar Producto' : 'Agregar Producto')}
            </Button>
            
            {productoExistente && (
              <Button 
                variant="outline-secondary" 
                type="button"
                onClick={() => window.history.back()}
              >
                Cancelar
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProductForm;