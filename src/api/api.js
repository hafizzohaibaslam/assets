import env from "../config/env";
import axios from "axios";

const api = axios.create({
    baseURL: env.REACT_APP_API_URL,
  });

export default api;