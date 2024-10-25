import React, { useState } from 'react';
import { registerVisitor } from '../services/accessService';

const ControlAcceso = () => {
  const [visitorData, setVisitorData] = useState({
    name: '',
    reasonForVisit: '',
    contactNumber: ''
  });

  const handleChange = (e) => {
    setVisitorData({
      ...visitorData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerVisitor(visitorData);
      alert('Visitante registrado exitosamente');
      setVisitorData({
        name: '',
        reasonForVisit: '',
        contactNumber: ''
      });
    } catch (error) {
      alert('Error al registrar visitante');
    }
  };

  return (
    <div>
      <h2>Registro de Visitantes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del visitante"
          value={visitorData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="reasonForVisit"
          placeholder="Razón de la visita"
          value={visitorData.reasonForVisit}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Número de contacto"
          value={visitorData.contactNumber}
          onChange={handleChange}
        />
        <button type="submit">Registrar Visita</button>
      </form>
    </div>
  );
};

export default ControlAcceso;
