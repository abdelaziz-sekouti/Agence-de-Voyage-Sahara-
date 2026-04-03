import { Tour, Destination, Guide, Testimonial } from './types';

export const TOURS: Tour[] = [
  {
    id: "1",
    slug: "magie-merzouga",
    title: "La Magie de Merzouga",
    subtitle: "Une immersion totale dans les dunes de l'Erg Chebbi",
    description: "Découvrez les dunes dorées de Merzouga lors d'une expédition de 3 jours inoubliable.",
    longDescription: "Laissez-vous transporter par la beauté majestueuse du Sahara. Ce voyage vous emmène au cœur de l'Erg Chebbi, où les dunes s'élèvent comme des vagues de sable doré. Vous vivrez l'expérience authentique d'une caravane de chameaux, dormirez sous un ciel étoilé d'une clarté absolue et découvrirez l'hospitalité légendaire des nomades berbères.",
    category: "aventure",
    duration: { days: 3, nights: 2 },
    price: { base: 2500, perPerson: 2500, currency: "MAD", includes: ["Transport", "Hébergement", "Repas", "Guide"] },
    difficulty: "facile",
    groupSize: { min: 2, max: 12 },
    departurePoint: { city: "Marrakech", coordinates: [31.6295, -7.9811] },
    itinerary: [
      {
        day: 1,
        title: "Marrakech - Dadès",
        description: "Traversée du Haut Atlas via le col de Tizi n'Tichka.",
        activities: ["Visite de Kasbah Ait Ben Haddou", "Studio de cinéma Ouarzazate"],
        accommodation: { type: "Riad", name: "Riad Dadès" },
        meals: ["Déjeuner", "Dîner"]
      },
      {
        day: 2,
        title: "Dadès - Merzouga",
        description: "Direction les dunes de l'Erg Chebbi.",
        activities: ["Gorges du Todra", "Caravane de chameaux au coucher du soleil"],
        accommodation: { type: "Bivouac de luxe", name: "Sahara Stars Camp" },
        meals: ["Petit-déjeuner", "Déjeuner", "Dîner"]
      },
      {
        day: 3,
        title: "Merzouga - Marrakech",
        description: "Retour vers la ville rouge avec des souvenirs plein la tête.",
        activities: ["Lever du soleil sur les dunes", "Visite du marché de Rissani"],
        accommodation: { type: "N/A", name: "N/A" },
        meals: ["Petit-déjeuner", "Déjeuner"]
      }
    ],
    highlights: ["Coucher de soleil sur l'Erg Chebbi", "Nuit sous tente berbère", "Kasbah Ait Ben Haddou"],
    included: ["Transport en 4x4 climatisé", "Guide local francophone", "Toutes les nuitées", "Demi-pension"],
    excluded: ["Boissons", "Pourboires", "Activités optionnelles (Quad, Buggy)"],
    gallery: [
      "https://picsum.photos/seed/merzouga1/1200/800",
      "https://picsum.photos/seed/merzouga2/1200/800",
      "https://picsum.photos/seed/merzouga3/1200/800"
    ],
    rating: { average: 4.9, count: 128, distribution: { 5: 110, 4: 15, 3: 3, 2: 0, 1: 0 } },
    reviews: [],
    availability: [
      { date: "2026-05-10", spotsLeft: 8, status: "available" },
      { date: "2026-05-15", spotsLeft: 2, status: "few_left" },
      { date: "2026-05-20", spotsLeft: 0, status: "sold_out" }
    ],
    featured: true,
    createdAt: "2024-01-01"
  },
  {
    id: "2",
    slug: "expedition-chigaga",
    title: "L'Inconnu de l'Erg Chigaga",
    subtitle: "Une aventure sauvage loin des sentiers battus",
    description: "Explorez les dunes les plus sauvages et les plus vastes du Maroc.",
    longDescription: "L'Erg Chigaga est le secret le mieux gardé du Sahara marocain. Plus difficile d'accès que Merzouga, il offre une solitude et une immensité incomparables. Ce voyage est destiné aux vrais aventuriers en quête de silence et de paysages bruts.",
    category: "aventure",
    duration: { days: 4, nights: 3 },
    price: { base: 3800, perPerson: 3800, currency: "MAD", includes: ["Transport", "Hébergement", "Repas", "Guide"] },
    difficulty: "modere",
    groupSize: { min: 2, max: 8 },
    departurePoint: { city: "Ouarzazate", coordinates: [30.9189, -6.8934] },
    itinerary: [],
    highlights: ["Dunes sauvages", "Lac Iriqui", "Nuits étoilées"],
    included: ["Transport 4x4", "Guide expert", "Pension complète"],
    excluded: ["Vols", "Assurance"],
    gallery: [
      "https://picsum.photos/seed/chigaga1/1200/800",
      "https://picsum.photos/seed/chigaga2/1200/800",
      "https://picsum.photos/seed/chigaga3/1200/800"
    ],
    rating: { average: 4.8, count: 45, distribution: { 5: 38, 4: 5, 3: 2, 2: 0, 1: 0 } },
    reviews: [],
    availability: [{ date: "2026-06-01", spotsLeft: 6, status: "available" }],
    featured: true,
    createdAt: "2024-01-05"
  },
  // Add 10 more tours to reach 12
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: (i + 3).toString(),
    slug: `tour-${i + 3}`,
    title: `Expédition Sahara ${i + 3}`,
    subtitle: "Une expérience unique au Maroc",
    description: "Découvrez les merveilles cachées du désert.",
    longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: ["aventure", "culture", "luxury", "familiale", "photographie"][i % 5] as any,
    duration: { days: 5, nights: 4 },
    price: { base: 3000 + i * 200, perPerson: 3000 + i * 200, currency: "MAD", includes: ["Transport", "Guide"] },
    difficulty: ["facile", "modere", "difficile"][i % 3] as any,
    groupSize: { min: 2, max: 10 },
    departurePoint: { city: "Marrakech", coordinates: [31.6295, -7.9811] as [number, number] },
    itinerary: [],
    highlights: ["Highlight 1", "Highlight 2"],
    included: ["Inclus 1"],
    excluded: ["Exclu 1"],
    gallery: [
      `https://picsum.photos/seed/tour${i + 3}-1/1200/800`,
      `https://picsum.photos/seed/tour${i + 3}-2/1200/800`,
      `https://picsum.photos/seed/tour${i + 3}-3/1200/800`
    ],
    rating: { average: 4.5 + (i % 5) / 10, count: 20 + i, distribution: { 5: 15, 4: 5, 3: 0, 2: 0, 1: 0 } },
    reviews: [],
    availability: [{ date: "2026-07-01", spotsLeft: 10, status: "available" as const }],
    featured: i < 2,
    createdAt: "2024-02-01"
  }))
];

export const DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Merzouga",
    region: "Draa-Tafilalet",
    description: "La porte du désert et les célèbres dunes de l'Erg Chebbi.",
    coordinates: [31.0992, -4.0129],
    climate: "Désertique chaud",
    bestSeason: "Octobre à Avril",
    attractions: [{ name: "Erg Chebbi", image: "https://picsum.photos/seed/ergchebbi/400/300" }],
    image: "https://picsum.photos/seed/merzouga/800/600",
    gallery: [],
    featured: true
  },
  {
    id: "2",
    name: "M'Hamid El Ghizlane",
    region: "Zagora",
    description: "Le dernier village avant l'immensité de l'Erg Chigaga.",
    coordinates: [29.8283, -5.7225],
    climate: "Aride",
    bestSeason: "Novembre à Mars",
    attractions: [],
    image: "https://picsum.photos/seed/mhamid/800/600",
    gallery: [],
    featured: true
  },
  // Add 6 more to reach 8
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: (i + 3).toString(),
    name: `Destination ${i + 3}`,
    region: "Maroc",
    description: "Une destination magnifique à explorer.",
    coordinates: [30 + i, -5 - i] as [number, number],
    climate: "Varié",
    bestSeason: "Printemps",
    attractions: [],
    image: `https://picsum.photos/seed/dest${i + 3}/800/600`,
    gallery: [],
    featured: i < 2
  }))
];

export const GUIDES: Guide[] = [
  {
    id: "1",
    name: "Youssef Sahraoui",
    photo: "https://picsum.photos/seed/guide1/400/400",
    specialty: "Expert en survie et astronomie",
    languages: ["Arabe", "Berbère", "Français", "Anglais"],
    experience: "15 ans",
    bio: "Né dans le désert, Youssef connaît chaque dune comme sa poche.",
    rating: 4.9,
    toursCompleted: 450,
    certifications: ["Guide de montagne certifié", "Secourisme en milieu isolé"]
  },
  // Add 5 more to reach 6
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: (i + 2).toString(),
    name: `Guide ${i + 2}`,
    photo: `https://picsum.photos/seed/guide${i + 2}/400/400`,
    specialty: "Culture et Histoire",
    languages: ["Français", "Espagnol"],
    experience: `${10 + i} ans`,
    bio: "Un passionné du patrimoine marocain.",
    rating: 4.8,
    toursCompleted: 200 + i * 20,
    certifications: ["Guide national"]
  }))
];

export const TESTIMONIALS: Testimonial[] = Array.from({ length: 15 }).map((_, i) => ({
  id: (i + 1).toString(),
  name: `Voyageur ${i + 1}`,
  avatar: `https://picsum.photos/seed/avatar${i + 1}/100/100`,
  tourName: TOURS[i % TOURS.length].title,
  rating: 5,
  text: "Une expérience absolument magique. Le silence du désert est quelque chose qu'il faut vivre au moins une fois dans sa vie.",
  date: "2024-03-15"
}));
