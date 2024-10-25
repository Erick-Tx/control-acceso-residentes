// src/components/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css'; 

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Registrar Residente</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/control-acceso">Control de Acceso</Link>
        </li>
        <li>
          <Link to="/statistics">Estadísticas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
