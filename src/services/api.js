import axios from 'axios';

const BACKEND_URL = "https://cubeverse-backend.onrender.com";
const API = `${BACKEND_URL}/api`;

export const getCubes = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.type) params.append('type', filters.type);
  if (filters.difficulty) params.append('difficulty', filters.difficulty);
  if (filters.search) params.append('search', filters.search);
  
  const response = await axios.get(`${API}/cubes?${params.toString()}`);
  return response.data.cubes;
};

export const getPatterns = async () => {
  const response = await axios.get(`${API}/patterns`);
  return response.data.patterns;
};

export const getFlags = async () => {
  const response = await axios.get(`${API}/flags`);
  return response.data.flags;
};

export const getYouTubeChannel = async () => {
  const response = await axios.get(`${API}/youtube`);
  return response.data.channel;
};
