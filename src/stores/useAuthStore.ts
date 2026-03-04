import { create } from "zustand";

interface AuthStore {
  user: {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
    email: string | null;
  } | null;
  setUser: (user: AuthStore["user"]) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;