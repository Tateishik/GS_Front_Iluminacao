import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Substitua pelo URL do seu backend

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data.token;
};

export const getLightStatus = async () => {
  const response = await axios.get(`${API_URL}/light-status`);
  return response.data;
};

export const setLightStatus = async (isOn: boolean) => {
  const response = await axios.post(`${API_URL}/light-status`, { isOn });
  return response.data;
};