import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "test" ? "" : import.meta.env.VITE_API_URL,
  timeout: 1000,
});

export { instance as axiosClient };
