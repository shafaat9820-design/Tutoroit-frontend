import api from "./axios";

// Register API
export const registerUser = (userData) => {
  return api.post("/api/auth/register", userData);
};

// Login API
export const loginUser = (userData) => {
  return api.post("/api/auth/login", userData);
};
