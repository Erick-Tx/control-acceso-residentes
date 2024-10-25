import axios from 'axios';

export const registerResident = async (data) => {
  const response = await axios.post('http://localhost:5000/api/residents/register', data);
  return response.data;
};
