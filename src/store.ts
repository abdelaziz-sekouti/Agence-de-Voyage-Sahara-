import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Booking, Tour, Message, PlannedTrip, Review } from './types';
import { TOURS } from './data';

interface AppState {
  user: User | null;
  bookings: Booking[];
  tours: Tour[];
  messages: Message[];
  plannedTrips: PlannedTrip[];
  favorites: string[];
  currency: string;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  addTour: (tour: Tour) => void;
  updateTour: (id: string, tour: Partial<Tour>) => void;
  deleteTour: (id: string) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, message: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  addPlannedTrip: (trip: PlannedTrip) => void;
  deletePlannedTrip: (id: string) => void;
  addReview: (tourId: string, review: Review) => void;
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
      tours: TOURS,
      messages: [],
      plannedTrips: [],
      favorites: [],
      currency: 'MAD',
      theme: 'light',
      setUser: (user) => set({ user }),
      addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
      updateBooking: (id, booking) => set((state) => ({
        bookings: state.bookings.map(b => b.id === id ? { ...b, ...booking } : b)
      })),
      deleteBooking: (id) => set((state) => ({
        bookings: state.bookings.filter(b => b.id !== id)
      })),
      addTour: (tour) => set((state) => ({ tours: [...state.tours, tour] })),
      updateTour: (id, tour) => set((state) => ({
        tours: state.tours.map(t => t.id === id ? { ...t, ...tour } : t)
      })),
      deleteTour: (id) => set((state) => ({
        tours: state.tours.filter(t => t.id !== id)
      })),
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      updateMessage: (id, message) => set((state) => ({
        messages: state.messages.map(m => m.id === id ? { ...m, ...message } : m)
      })),
      deleteMessage: (id) => set((state) => ({
        messages: state.messages.filter(m => m.id !== id)
      })),
      addPlannedTrip: (trip) => set((state) => ({ plannedTrips: [...state.plannedTrips, trip] })),
      deletePlannedTrip: (id) => set((state) => ({
        plannedTrips: state.plannedTrips.filter(t => t.id !== id)
      })),
      addReview: (tourId, review) => set((state) => ({
        tours: state.tours.map(t => {
          if (t.id === tourId) {
            const newReviews = [...t.reviews, review];
            const newCount = t.rating.count + 1;
            const newDistribution = { ...t.rating.distribution };
            newDistribution[review.rating] = (newDistribution[review.rating] || 0) + 1;
            const newAverage = Number(((t.rating.average * t.rating.count + review.rating) / newCount).toFixed(1));
            return {
              ...t,
              reviews: newReviews,
              rating: {
                ...t.rating,
                average: newAverage,
                count: newCount,
                distribution: newDistribution
              }
            };
          }
          return t;
        })
      })),
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
