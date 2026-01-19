
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://192.168.68.125:5000", 
  timeout: 5000,
});
