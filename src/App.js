// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu'; 
import RegisterResident from './components/RegisterResident';
import Login from './components/Login'; 
import ControlAcceso from './components/ControlAcceso'; 
import Statistics from './components/Statistics'; 

const App = () => {
  return (
    <Router>
      <Menu /> {/* Menu */}
      <Routes>
        <Route path="/" element={<RegisterResident />} />
        <Route path="/login" element={<Login />} />
        <Route path="/control-acceso" element={<ControlAcceso />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
};

export default App;
