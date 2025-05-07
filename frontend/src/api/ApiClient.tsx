import axios from "axios";

const APiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  //   baseURL:"https://ecommerce-api.herokuapp.com/api"
  timeout: 5000,
});

export default APiClient;
