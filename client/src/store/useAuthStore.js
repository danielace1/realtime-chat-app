import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoading: false,

  login: async () => {},

  signup: async () => {},

  logout: async () => {},
}));

export default useAuthStore;
