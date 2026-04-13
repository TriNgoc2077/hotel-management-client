import { create } from "zustand";

const ACCESS_TOKEN_KEY = "access_token";
const AUTH_USER_KEY = "auth_user";

const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
const storedUser = localStorage.getItem(AUTH_USER_KEY);

const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const useAuthStore = create((set) => ({
  user: initialUser,
  accessToken: storedToken,

  login: (data) => {
    set({
      user: data.user,
      accessToken: data.token,
    });

    localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
  },

  logout: () => {
    set({ user: null, accessToken: null });
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },
}));
