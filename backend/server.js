const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors'); 

const app = express();
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/control-acceso');

// Modelo de residente
const residentSchema = new mongoose.Schema({
  name: String,
  idNumber: String,
  vehiclePlate: String,
  password: String
});

const Resident = mongoose.model('Resident', residentSchema);

// Rutas para registro y autenticación
app.post('/api/residents/register', async (req, res) => {
  const { name, idNumber, vehiclePlate, password } = req.body;

  // Verifica si la contraseña está presente
  if (!password) {
    return res.status(400).send({ message: 'La contraseña es requerida' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const resident = new Resident({ name, idNumber, vehiclePlate, password: hashedPassword });
    await resident.save();
    res.send({ message: 'Residente registrado' });
  } catch (error) {
    res.status(500).send({ message: 'Error al registrar al residente', error });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { idNumber, password } = req.body;

  try {
    const resident = await Resident.findOne({ idNumber });
    if (!resident || !(await bcrypt.compare(password, resident.password))) {
      return res.status(400).send({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: resident._id }, 'secretkey');
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error en el servidor', error });
  }
});

// Modelo de visitante y ruta de registro
const visitorSchema = new mongoose.Schema({
  name: String,
  reasonForVisit: String,
  contactNumber: String,
  entryTime: { type: Date, default: Date.now }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

app.post('/api/visitors/register', async (req, res) => {
  const { name, reasonForVisit, contactNumber } = req.body;
  const visitor = new Visitor({ name, reasonForVisit, contactNumber });
  await visitor.save();
  res.send({ message: 'Visitante registrado' });
});

// Ruta para obtener estadísticas de visitas
app.get('/api/visits/statistics', async (req, res) => {
    try {
      const visitors = await Visitor.find();
  
      // Calcular la frecuencia de visitas
      const totalVisits = visitors.length;
  
      // Calcular las horas pico
      const visitHours = visitors.map(visitor => new Date(visitor.entryTime).getHours());
      const peakHours = {};
  
      visitHours.forEach(hour => {
        if (!peakHours[hour]) {
          peakHours[hour] = 0;
        }
        peakHours[hour]++;
      });
  
      // Encuentra la hora con más visitas
      const maxVisitsHour = Object.keys(peakHours).reduce((a, b) => peakHours[a] > peakHours[b] ? a : b);
  
      res.send({
        totalVisits,
        peakHour: maxVisitsHour,
        peakVisits: peakHours[maxVisitsHour]
      });
    } catch (error) {
      res.status(500).send({ message: 'Error al obtener estadísticas', error });
    }
  });
  

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
