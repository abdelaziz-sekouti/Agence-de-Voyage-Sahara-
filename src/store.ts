import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Booking, Tour } from './types';

interface AppState {
  user: User | null;
  bookings: Booking[];
  favorites: string[];
  currency: string;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  addBooking: (booking: Booking) => void;
  toggleFavorite: (tourId: string) => void;
  setCurrency: (currency: string) => void;
  toggleTheme: () => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      bookings: [],
      favorites: [],
      currency: 'MAD',
      theme: 'light',
      setUser: (user) => set({ user }),
      addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
      toggleFavorite: (tourId) => set((state) => ({
        favorites: state.favorites.includes(tourId)
          ? state.favorites.filter(id => id !== tourId)
          : [...state.favorites, tourId]
      })),
      setCurrency: (currency) => set({ currency }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      logout: () => set({ user: null, bookings: [], favorites: [] }),
    }),
    {
      name: 'sahara-storage',
    }
  )
);
