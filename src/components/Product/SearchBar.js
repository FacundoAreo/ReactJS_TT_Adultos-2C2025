import React, { useState } from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * Componente de barra de búsqueda de productos
 * Permite buscar productos por nombre, categoría o descripción
 */
const SearchBar = ({ onSearch, className = '' }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const navigate = useNavigate();

  /**
   * Manejar envío del formulario de búsqueda
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (terminoBusqueda.trim()) {
      // Navegar a la página de productos con el término de búsqueda
      navigate(`/productos?search=${encodeURIComponent(terminoBusqueda)}`);
      
      // Limpiar el campo de búsqueda
      setTerminoBusqueda('');
      
      // Ejecutar callback si existe
      if (onSearch) {
        onSearch();
      }
    }
  };

  /**
   * Manejar cambio en el input de búsqueda
   * @param {Event} e - Evento del input
   */
  const handleChange = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  return (
    <Form 
      onSubmit={handleSubmit} 
      className={`search-bar ${className}`}
    >
      <InputGroup>
        <FormControl
          type="search"
          placeholder="Buscar productos..."
          aria-label="Buscar productos"
          value={terminoBusqueda}
          onChange={handleChange}
          className="border-end-0"
        />
        <Button 
          variant="outline-primary" 
          type="submit"
          disabled={!terminoBusqueda.trim()}
        >
          🔍
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;