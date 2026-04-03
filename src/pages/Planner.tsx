import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Plus, Trash2, ArrowRight, Compass, Download, Share2, Save, Users, DollarSign } from 'lucide-react';
import { DESTINATIONS } from '../data';
import { cn, generateId, formatPrice } from '../lib/utils';
import { toast } from '../components/Toast';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

export const Planner = () => {
  const { user, addPlannedTrip } = useStore();
  const navigate = useNavigate();
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<{ id: string; destId: string; day: number }[]>([]);
  const [startDate, setStartDate] = useState('');
  const [travelers, setTravelers] = useState(2);

  const toggleDestination = (id: string) => {
    if (selectedDestinations.includes(id)) {
      setSelectedDestinations(prev => prev.filter(d => d !== id));
      setItinerary(prev => prev.filter(i => i.destId !== id));
    } else {
      setSelectedDestinations(prev => [...prev, id]);
      setItinerary(prev => [...prev, { id: generateId(), destId: id, day: prev.length + 1 }]);
    }
  };

  const estimatedBudget = useMemo(() => {
    // Simple estimation: 1500 MAD per day per person
    const days = itinerary.length || 1;
    return days * travelers * 1500;
  }, [itinerary.length, travelers]);

  const handleSave = () => {
    if (!user) {
      toast.error("Veuillez vous connecter pour enregistrer votre voyage.");
      navigate('/auth');
      return;
    }

    const newTrip = {
      id: generateId(),
      userId: user.id,
      destinations: selectedDestinations,
      startDate,
      duration: itinerary.length,
      budget: estimatedBudget,
      travelers,
      createdAt: new Date().toISOString()
    };

    addPlannedTrip(newTrip);
    toast.success("Voyage enregistré dans votre tableau de bord !");
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
          {/* Configuration & Selection */}
          <div className="lg:col-span-7 space-y-12">
            {/* Step 1: Config */}
            <section className="space-y-6">
              <h3 className="text-xl font-display font-bold flex items-center gap-2">
                <Calendar className="text-sahara-gold" /> 1. Détails du voyage
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl border border-sand-100 shadow-sm">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Date de départ</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 bg-sand-50 border border-sand-100 rounded-xl focus:ring-2 focus:ring-sahara-gold outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Nombre de voyageurs</label>
                  <div className="flex items-center gap-4 bg-sand-50 p-1 rounded-xl border border-sand-100">
                    <button 
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold"
                    >-</button>
                    <span className="flex-1 text-center font-bold">{travelers}</span>
                    <button 
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold"
                    >+</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2: Destinations */}
            <section className="space-y-6">
              <h3 className="text-xl font-display font-bold flex items-center gap-2">
                <MapPin className="text-sahara-gold" /> 2. Choisissez vos étapes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DESTINATIONS.map(dest => (
                  <button
                    key={dest.id}
                    onClick={() => toggleDestination(dest.id)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group",
                      selectedDestinations.includes(dest.id) 
                        ? "bg-sahara-gold/5 border-sahara-gold shadow-lg shadow-sahara-gold/5" 
                        : "bg-white border-sand-200 hover:border-sahara-gold/50"
                    )}
                  >
                    <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-xl">
                      <img src={dest.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    </div>
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
            </section>
          </div>

          {/* Itinerary Preview */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 bg-white rounded-3xl p-8 shadow-2xl border border-sand-100">
              <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-2">
                <Compass className="text-sahara-gold" /> Votre Itinéraire
              </h3>
              
              {itinerary.length > 0 ? (
                <div className="space-y-6 mb-10">
                  <AnimatePresence mode="popLayout">
                    {itinerary.map((item, i) => {
                      const dest = DESTINATIONS.find(d => d.id === item.destId);
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="relative pl-10"
                        >
                          <div className="absolute left-0 top-0 w-6 h-6 bg-sand-100 text-sahara-gold rounded-full flex items-center justify-center text-[10px] font-bold border border-sahara-gold/20">
                            {i + 1}
                          </div>
                          {i !== itinerary.length - 1 && (
                            <div className="absolute left-3 top-6 bottom-0 w-px border-l-2 border-dashed border-sand-100" />
                          )}
                          <div className="flex justify-between items-center bg-sand-50/50 p-3 rounded-xl border border-sand-100/50">
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

              {/* Budget Estimation */}
              <div className="bg-desert-night text-white p-6 rounded-2xl mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-50">Budget Estimé</span>
                  <DollarSign size={16} className="text-sahara-gold" />
                </div>
                <div className="text-2xl font-bold text-sahara-gold">
                  {formatPrice(estimatedBudget)}
                </div>
                <p className="text-[10px] opacity-50 mt-2">* Basé sur une estimation moyenne par personne et par jour.</p>
              </div>

              <div className="space-y-4">
                <button 
                  disabled={itinerary.length === 0}
                  onClick={handleSave}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={20} /> Enregistrer le voyage
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    disabled={itinerary.length === 0}
                    onClick={handleExport}
                    className="btn-outline py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    <Download size={18} /> PDF
                  </button>
                  <button 
                    disabled={itinerary.length === 0}
                    className="btn-outline py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    <Share2 size={18} /> Partager
                  </button>
                </div>
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
