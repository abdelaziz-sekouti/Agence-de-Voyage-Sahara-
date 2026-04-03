import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Plus, Trash2, ArrowRight, Compass, Download, Share2 } from 'lucide-react';
import { DESTINATIONS } from '../data';
import { cn, generateId } from '../lib/utils';
import { toast } from '../components/Toast';

export const Planner = () => {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<{ id: string; destId: string; day: number }[]>([]);

  const toggleDestination = (id: string) => {
    if (selectedDestinations.includes(id)) {
      setSelectedDestinations(prev => prev.filter(d => d !== id));
      setItinerary(prev => prev.filter(i => i.destId !== id));
    } else {
      setSelectedDestinations(prev => [...prev, id]);
      const dest = DESTINATIONS.find(d => d.id === id);
      if (dest) {
        setItinerary(prev => [...prev, { id: generateId(), destId: id, day: prev.length + 1 }]);
      }
    }
  };

  const handleExport = () => {
    toast.success("Itinéraire exporté avec succès !");
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-desert-night mb-4">Planificateur de Voyage</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Créez votre propre aventure personnalisée en sélectionnant vos destinations préférées.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Destination Selection */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-xl font-display font-bold flex items-center gap-2">
              <MapPin className="text-sahara-gold" /> 1. Choisissez vos étapes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DESTINATIONS.map(dest => (
                <button
                  key={dest.id}
                  onClick={() => toggleDestination(dest.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                    selectedDestinations.includes(dest.id) 
                      ? "bg-sahara-gold/5 border-sahara-gold shadow-lg shadow-sahara-gold/5" 
                      : "bg-white border-sand-200 hover:border-sahara-gold/50"
                  )}
                >
                  <img src={dest.image} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{dest.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{dest.region}</p>
                  </div>
                  {selectedDestinations.includes(dest.id) && (
                    <div className="w-6 h-6 bg-sahara-gold text-white rounded-full flex items-center justify-center">
                      <Check size={14} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Itinerary Preview */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 bg-white rounded-3xl p-8 shadow-2xl border border-sand-100">
              <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-2">
                <Compass className="text-sahara-gold" /> 2. Votre Itinéraire
              </h3>
              
              {itinerary.length > 0 ? (
                <div className="space-y-6 mb-10">
                  <AnimatePresence>
                    {itinerary.map((item, i) => {
                      const dest = DESTINATIONS.find(d => d.id === item.destId);
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="relative pl-10"
                        >
                          <div className="absolute left-0 top-0 w-6 h-6 bg-sand-100 text-sahara-gold rounded-full flex items-center justify-center text-[10px] font-bold border border-sahara-gold/20">
                            {i + 1}
                          </div>
                          {i !== itinerary.length - 1 && (
                            <div className="absolute left-3 top-6 bottom-0 w-px bg-dashed border-l border-sand-200" />
                          )}
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-bold text-sm">{dest?.name}</p>
                              <p className="text-[10px] text-gray-400">Jour {i + 1}</p>
                            </div>
                            <button 
                              onClick={() => toggleDestination(item.destId)}
                              className="p-2 text-gray-300 hover:text-sahara-red transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="py-12 text-center border-2 border-dashed border-sand-100 rounded-2xl mb-10">
                  <p className="text-gray-400 text-sm">Sélectionnez des destinations pour commencer votre plan.</p>
                </div>
              )}

              <div className="space-y-4">
                <button 
                  disabled={itinerary.length === 0}
                  onClick={handleExport}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={20} /> Télécharger le PDF
                </button>
                <button 
                  disabled={itinerary.length === 0}
                  className="w-full btn-outline py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Share2 size={20} /> Partager l'itinéraire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Check = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
