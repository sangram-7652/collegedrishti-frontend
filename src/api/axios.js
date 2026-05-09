import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://symphonic-mandatory-endeared.ngrok-free.dev/api";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default instance;
