
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://192.168.11.106:5000", 
  timeout: 5000,
});
