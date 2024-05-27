import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  userDetails: { username: string; password: string } | null;
  isLoggedIn: boolean;
  login: (details: { username: string; password: string }) => void;
  logout: () => void;
  signup: (details: { username: string; password: string }) => Promise<void>;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userDetails: null,
      isLoggedIn: false,
      login: (details) => set({ userDetails: details, isLoggedIn: true }),
      logout: () => set({ userDetails: null, isLoggedIn: false }),
      signup: async (details) => {
        // Now handled by persist, no need to use AsyncStorage directly here
        set({ userDetails: details, isLoggedIn: true });
      },
    }),
    {
      name: 'user-storage', // The key used for storing the state in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;