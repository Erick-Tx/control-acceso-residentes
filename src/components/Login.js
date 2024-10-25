import React, { useState } from 'react';
import { login } from '../services/authService';

const Login = () => {
  const [credentials, setCredentials] = useState({
    idNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(credentials);
      localStorage.setItem('token', token);  // Almacena el token para futuras solicitudes
      alert('Login exitoso');
    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="idNumber"
          placeholder="Número de ID"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
