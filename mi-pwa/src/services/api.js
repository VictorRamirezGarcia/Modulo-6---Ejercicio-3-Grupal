//api.ts (archivo de API)
import axios from 'axios';
import { decryptData } from './encryption';

const api = axios.create({
baseURL: process.env.REACT_APP_API_URL,
headers: {
    'Api-Key': process.env.REACT_APP_API_KEY, // API Key desde .env.local
},
});

api.interceptors.request.use((config) => {
const token = localStorage.getItem('authToken');
if (token) {
    config.headers.Authorization = `Bearer ${decryptData(token)}`; // Decifrar JWT
}
return config;
});

api.interceptors.response.use(
(response) => response,
(error) => {
    if (error.response.status === 401) {
    localStorage.removeItem('authToken');
      window.location.href = '/login'; // Redirigir si el token es inválido
    }
    return Promise.reject(error);
}
);