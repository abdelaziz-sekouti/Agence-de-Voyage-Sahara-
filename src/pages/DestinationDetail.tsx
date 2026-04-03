import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { DESTINATIONS, TOURS } from '../data';
import { TourCard } from '../components/TourCard';
import { MapPin, Sun, Cloud, Wind, ArrowLeft, ChevronRight } from 'lucide-react';

export const DestinationDetail = () => {
  const { id } = useParams();
  const destination = DESTINATIONS.find(d => d.id === id);
  const relatedTours = TOURS.filter(t => t.departurePoint.city === destination?.name || t.description.includes(destination?.name || ''));

  if (!destination) return <div>Destination non trouvée</div>;

  return (
    <div className="pt-24 pb-24 bg-sand-50">
      {/* Hero */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden mb-24">
        <img src={destination.image} alt={destination.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-desert-night/40" />
        <div className="relative z-10 text-center px-6">
          <p className="text-sahara-gold text-sm font-bold uppercase tracking-[0.3em] mb-4">{destination.region}</p>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8">{destination.name}</h1>
          <div className="flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Sun size={20} className="text-sahara-gold" />
              <span className="text-sm font-bold uppercase tracking-widest">{destination.climate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-sahara-gold" />
              <span className="text-sm font-bold uppercase tracking-widest">{destination.bestSeason}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">À propos de {destination.name}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{destination.description}</p>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold mb-8">Attractions Incontournables</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.attractions.length > 0 ? destination.attractions.map((attr, i) => (
                  <div key={i} className="group relative h-64 rounded-3xl overflow-hidden shadow-lg">
                    <img src={attr.image} alt={attr.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-desert-night/80 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <h4 className="text-white font-bold text-xl">{attr.name}</h4>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 p-12 bg-white rounded-3xl border border-sand-100 text-center text-gray-400">
                    Plus d'attractions seront ajoutées bientôt.
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold mb-8">Voyages passant par {destination.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedTours.map(tour => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand-100">
              <h4 className="text-sm font-bold uppercase tracking-widest text-desert-night mb-6">Météo Actuelle</h4>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sahara-gold/10 text-sahara-gold rounded-xl flex items-center justify-center">
                    <Sun size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">32°C</p>
                    <p className="text-xs text-gray-400">Ensoleillé</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { day: "Demain", temp: "31°C", icon: Sun },
                  { day: "Samedi", temp: "29°C", icon: Cloud },
                  { day: "Dimanche", temp: "30°C", icon: Sun }
                ].map((w, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{w.day}</span>
                    <div className="flex items-center gap-3">
                      <w.icon size={16} className="text-sahara-gold" />
                      <span className="font-bold">{w.temp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-desert-night p-8 rounded-3xl text-white">
              <h4 className="text-xl font-display font-bold mb-4">Besoin d'aide ?</h4>
              <p className="text-sm text-gray-400 mb-6">Nos experts sont là pour vous conseiller sur la meilleure période pour visiter {destination.name}.</p>
              <Link to="/contact" className="btn-primary w-full text-center block py-3">Nous contacter</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Calendar = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
