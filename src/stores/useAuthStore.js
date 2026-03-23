import { create } from "zustand";

// user: 
//   name
//   email
//   avatar
//   phone
//   roleName

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,

  login: (data) => {
    set({
      user: data.user,
      accessToken: data.token,
    });

    localStorage.setItem("access_token", data.token);
  },

  logout: () => {
    set({ user: null, accessToken: null });
    localStorage.removeItem("access_token");
  },
}));