import axios from "axios";
const PORT = import.meta.env.VITE_SERVER_PORT || "5002";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://localhost:${PORT}`;

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default instance;
