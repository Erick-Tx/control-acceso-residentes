import axios from 'axios';

export const registerVisitor = async (visitorData) => {
  const response = await axios.post('/api/visitors/register', visitorData);
  return response.data;
};
