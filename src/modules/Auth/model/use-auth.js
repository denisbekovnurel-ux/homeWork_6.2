import { create } from "zustand";

export const useAuth = create((set) => ({
  isAuth: !!localStorage.getItem("token"),
  user: null,

  setAuth: (bool) => set({ isAuth: bool }),
  setUser: (user) => set({ user }),
  clear: () => set({ isAuth: false, user: null }),
}));
