import axiosClient from "../utils/axios";

const authService = {
  login: (data) => {
    const res = axiosClient.post("/auth/login", data);

    if (res?.accessToken) {
      localStorage.setItem("token", res.accessToken);
    }

    return res;
  },

  register: (data) => {
    return axiosClient.post("/auth/register", data);
  },

  refreshToken: () => {
    const res = axiosClient.post("/auth/refresh");

    if (res?.accessToken) {
      localStorage.setItem("token", res.accessToken);
    }

    return res;
  },

  forgotPassword: () => {
    const res = axiosClient.post("/auth/forgot-password");

    return res;
  },

  logout: () => {
    axiosClient.post("/auth/logout");
  },
};

export default authService;
