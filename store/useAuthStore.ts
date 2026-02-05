import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  session: User | null;
  isHydrated: boolean; // Tracks if storage has finished loading
  login: (user: User) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      isHydrated: false,

      login: (user) => set({ session: user }),
      
      logout: () => set({ session: null }),

      setHasHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: 'auth-storage', // Unique name for storage
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // This runs after the data is fetched from the phone's disk
        state?.setHasHydrated(true);
      },
    }
  )
);