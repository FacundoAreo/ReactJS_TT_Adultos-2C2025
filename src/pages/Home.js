import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>UNQUIRGOLAS</h1>
          <p>Hongos comestibles, medicinales, preparaciones.</p>
          <Link to="/productos" className="btn btn-primary">
  Ver Productos
</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;