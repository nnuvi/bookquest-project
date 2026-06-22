import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "@/types/auth"

type AuthState = {
  user: User | null;
  loading: boolean;

  login: (user: User,) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,

      login: (user) => {
        set({
          user,
        });
      },
      setLoading: (loading) => set({ loading }),

      logout: () => {
        set({
          user: null,
        });
      },
    }),
    {
      name: "auth-storage", // key in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);