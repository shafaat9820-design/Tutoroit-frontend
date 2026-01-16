import api from "./api";

/**
 * Register user
 */
export const registerUser = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

/**
 * Login user
 */
export const loginUser = async (loginData) => {
  const response = await api.post("/api/auth/login", loginData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    window.dispatchEvent(new Event("authChange"));
  }

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("authChange"));
};


/**
 * Get logged-in user
 */
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// /**
//  * Logout user
//  */
// export const logoutUser = () => {
//   localStorage.removeItem("user");
// };
