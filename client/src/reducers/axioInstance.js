import axios from "axios";
const PORT = import.meta.env.VITE_SERVER_PORT;
console.log(PORT)
const instance = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

export default instance;
