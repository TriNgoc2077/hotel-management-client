import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;

    if (response) {
      if (response.status === 401) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }

      return Promise.reject(response.data);
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
