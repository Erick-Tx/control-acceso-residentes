import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/visits/statistics');
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <div>Cargando estadísticas...</div>;

  return (
    <div>
      <h2>Estadísticas de Visitas</h2>
      <p>Total de Visitas: {statistics.totalVisits}</p>
      <p>Hora Pico: {statistics.peakHour}:00 con {statistics.peakVisits} visitas</p>
    </div>
  );
};

export default Statistics;
