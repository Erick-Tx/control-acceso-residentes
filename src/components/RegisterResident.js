import React, { useState } from 'react';
import { registerResident } from '../services/residentService';

const RegisterResident = () => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    vehiclePlate: '',
    password: '' 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerResident(formData);
      alert('Residente registrado exitosamente');
    } catch (error) {
      alert('Error en el registro');
    }
  };

  return (
    <div>
      <h2>Registro de Residente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
        />
        <input
          type="text"
          name="idNumber"
          placeholder="Número de ID"
          onChange={handleChange}
        />
        <input
          type="text"
          name="vehiclePlate"
          placeholder="Placa del vehículo"
          onChange={handleChange}
        />
        <input
          type="password" 
          name="password"
          placeholder="Contraseña" 
          onChange={handleChange}
          required 
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterResident;
