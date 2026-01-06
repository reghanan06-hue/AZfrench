
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://172.25.192.1:5000",
  timeout: 5000,
});
