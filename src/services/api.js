import axios from "axios";

/*
  ✅ VITE_API_BASE_URL
  - Local: http://localhost:8080
  - Production: https://tutoroit-backend-1.onrender.com
*/

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
