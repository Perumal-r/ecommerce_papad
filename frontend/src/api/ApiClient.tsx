import axios from "axios";

const APiClient = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL:"https://ecommerce-papad-backend.vercel.app",
  timeout: 5000,
});

export default APiClient;
