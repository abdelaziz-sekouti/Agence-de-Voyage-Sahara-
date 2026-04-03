import React from 'react';
import { motion } from 'motion/react';
import { Star, Clock, Users, MapPin, Heart } from 'lucide-react';
import { Tour } from '../types';
import { formatPrice, cn } from '../lib/utils';
import { useStore } from '../store';
import { Link } from 'react-router-dom';

interface TourCardProps {
  tour: Tour;
  layout?: 'grid' | 'list';
}

export const TourCard: React.FC<TourCardProps> = ({ tour, layout = 'grid' }) => {
  const { favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(tour.id);

  if (layout === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row border border-sand-100"
      >
        <div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden">
          <img
            src={tour.gallery[0]}
            alt={tour.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-sahara-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {tour.category}
            </span>
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-display font-bold text-desert-night group-hover:text-sahara-gold transition-colors">
                {tour.title}
              </h3>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(tour.id);
                }}
                className={cn(
                  "p-2 rounded-full transition-all",
                  isFavorite ? "bg-sahara-red/10 text-sahara-red" : "bg-sand-50 text-gray-400 hover:text-sahara-red"
                )}
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1"><Clock size={14} /> {tour.duration.days} jours</span>
              <span className="flex items-center gap-1"><Users size={14} /> Max {tour.groupSize.max} pers.</span>
              <span className="flex items-center gap-1 text-sahara-gold"><Star size={14} fill="currentColor" /> {tour.rating.average}</span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{tour.description}</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-sand-50">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">À partir de</p>
              <p className="text-xl font-bold text-desert-night">{formatPrice(tour.price.perPerson)}</p>
            </div>
            <Link to={`/tour/${tour.id}`} className="btn-primary py-2 px-6 text-sm">
              Découvrir
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-sand-100"
    >
      <Link to={`/tour/${tour.id}`} className="block relative h-64 overflow-hidden">
        <img
          src={tour.gallery[0]}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-desert-night/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4">
          <span className="bg-sahara-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {tour.category}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(tour.id);
          }}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all",
            isFavorite ? "bg-sahara-red text-white" : "bg-white/20 text-white hover:bg-white/40"
          )}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="btn-primary w-full py-2 text-sm text-center block">Voir le voyage</span>
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sahara-gold mb-2">
          <MapPin size={12} /> {tour.departurePoint.city}
        </div>
        <h3 className="text-lg font-display font-bold text-desert-night mb-3 line-clamp-1 group-hover:text-sahara-gold transition-colors">
          {tour.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Clock size={14} /> {tour.duration.days} jours</span>
          <span className="flex items-center gap-1 text-sahara-gold font-bold">
            <Star size={14} fill="currentColor" /> {tour.rating.average}
          </span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-sand-50">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Prix</p>
            <p className="text-lg font-bold text-desert-night">{formatPrice(tour.price.perPerson)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Difficulté</p>
            <p className={cn(
              "text-xs font-bold capitalize",
              tour.difficulty === 'facile' && "text-oasis-green",
              tour.difficulty === 'modere' && "text-sahara-orange",
              tour.difficulty === 'difficile' && "text-sahara-red"
            )}>
              {tour.difficulty}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
