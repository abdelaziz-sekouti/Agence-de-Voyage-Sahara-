import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TOURS, DESTINATIONS } from '../data';
import { cn } from '../lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ tours: typeof TOURS, destinations: typeof DESTINATIONS }>({ tours: [], destinations: [] });
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 1) {
      const q = query.toLowerCase();
      const filteredTours = TOURS.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      ).slice(0, 4);
      
      const filteredDestinations = DESTINATIONS.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.region.toLowerCase().includes(q)
      ).slice(0, 4);

      setResults({ tours: filteredTours, destinations: filteredDestinations });
    } else {
      setResults({ tours: [], destinations: [] });
    }
  }, [query]);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-desert-night/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-sand-100 flex items-center gap-4">
              <Search className="text-gray-400" size={24} />
              <input
                autoFocus
                type="text"
                placeholder="Rechercher une destination, un circuit..."
                className="flex-1 bg-transparent border-none outline-none text-xl font-display"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={onClose} className="p-2 hover:bg-sand-50 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto">
              {query.trim().length > 1 ? (
                <div className="space-y-12">
                  {results.tours.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Circuits</h3>
                      <div className="grid gap-4">
                        {results.tours.map(tour => (
                          <button
                            key={tour.id}
                            onClick={() => handleSelect(`/tour/${tour.id}`)}
                            className="flex items-center gap-6 p-4 rounded-2xl hover:bg-sand-50 transition-colors text-left group"
                          >
                            <img src={tour.image} alt={tour.name} className="w-16 h-16 rounded-xl object-cover" />
                            <div className="flex-1">
                              <h4 className="font-bold text-desert-night group-hover:text-sahara-gold transition-colors">{tour.title}</h4>
                              <p className="text-sm text-gray-500">{tour.duration.days} jours • Dès {tour.price.base} MAD</p>
                            </div>
                            <ArrowRight size={18} className="text-gray-300 group-hover:text-sahara-gold transition-transform group-hover:translate-x-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.destinations.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Destinations</h3>
                      <div className="grid gap-4">
                        {results.destinations.map(dest => (
                          <button
                            key={dest.id}
                            onClick={() => handleSelect(`/destination/${dest.id}`)}
                            className="flex items-center gap-6 p-4 rounded-2xl hover:bg-sand-50 transition-colors text-left group"
                          >
                            <img src={dest.image} alt={dest.name} className="w-16 h-16 rounded-xl object-cover" />
                            <div className="flex-1">
                              <h4 className="font-bold text-desert-night group-hover:text-sahara-gold transition-colors">{dest.name}</h4>
                              <p className="text-sm text-gray-500">{dest.region}</p>
                            </div>
                            <ArrowRight size={18} className="text-gray-300 group-hover:text-sahara-gold transition-transform group-hover:translate-x-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.tours.length === 0 && results.destinations.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-400">Aucun résultat pour "{query}"</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Suggestions Populaires</h3>
                    <div className="flex flex-wrap gap-3">
                      {['Merzouga', 'Dakhla', 'Zagora', 'Agafay', 'Trekking', 'Luxe'].map(tag => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-6 py-2 rounded-full border border-sand-100 hover:border-sahara-gold hover:text-sahara-gold transition-all text-sm font-medium"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-sand-50 rounded-3xl">
                      <MapPin className="text-sahara-gold mb-4" size={24} />
                      <h4 className="font-bold mb-2">Explorer par Région</h4>
                      <p className="text-sm text-gray-500">Découvrez le Sahara à travers ses régions emblématiques.</p>
                    </div>
                    <div className="p-6 bg-sand-50 rounded-3xl">
                      <Calendar className="text-sahara-gold mb-4" size={24} />
                      <h4 className="font-bold mb-2">Planificateur de Voyage</h4>
                      <p className="text-sm text-gray-500">Créez votre itinéraire sur mesure en quelques clics.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
