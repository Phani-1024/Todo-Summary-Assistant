import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-summary-backend.onrender.com", // 🔄 replace with your actual Render URL
});

export default instance;
