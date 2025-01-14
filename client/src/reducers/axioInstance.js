import axios from "axios";
const PORT = import.meta.env.VITE_SERVER_PORT;


axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "https://sync-life-api.vercel.app",
});

export default instance;
