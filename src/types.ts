export interface Tour {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: "aventure" | "culture" | "luxury" | "familiale" | "photographie";
  duration: { days: number; nights: number };
  price: { base: number; perPerson: number; currency: string; includes: string[] };
  difficulty: "facile" | "modere" | "difficile";
  groupSize: { min: number; max: number };
  departurePoint: { city: string; coordinates: [number, number] };
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    accommodation: { type: string; name: string };
    meals: string[];
  }[];
  highlights: string[];
  included: string[];
  excluded: string[];
  gallery: string[];
  rating: { average: number; count: number; distribution: Record<number, number> };
  reviews: Review[];
  availability: { date: string; spotsLeft: number; status: "available" | "few_left" | "sold_out" }[];
  featured: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  tourId: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  coordinates: [number, number];
  climate: string;
  bestSeason: string;
  attractions: { name: string; image: string }[];
  image: string;
  gallery: string[];
  featured: boolean;
}

export interface Guide {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  languages: string[];
  experience: string;
  bio: string;
  rating: number;
  toursCompleted: number;
  certifications: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  tourName: string;
  rating: number;
  text: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  nationality?: string;
  bio?: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface Booking {
  id: string;
  tourId: string;
  userId: string;
  date: string;
  travelers: { adults: number; children: number };
  groupType: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    nationality: string;
    specialRequirements: string;
    emergencyContact: string;
  };
  extras: { name: string; price: number }[];
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt: string;
  reference: string;
}
