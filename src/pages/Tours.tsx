import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Search, Grid, List as ListIcon, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { TOURS } from '../data';
import { TourCard } from '../components/TourCard';
import { cn } from '../lib/utils';

export const Tours = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState('popularité');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const categories = ["aventure", "culture", "luxury", "familiale", "photographie"];

  const filteredTours = useMemo(() => {
    return TOURS.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tour.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(tour.category);
      const matchesPrice = tour.price.perPerson >= priceRange[0] && tour.price.perPerson <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'prix-croissant') return a.price.perPerson - b.price.perPerson;
      if (sortBy === 'prix-decroissant') return b.price.perPerson - a.price.perPerson;
      if (sortBy === 'note') return b.rating.average - a.rating.average;
      return 0;
    });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const toggleCategory = (cat: string) => {
    setSelectedCategory(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-sand-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-5xl font-display font-bold text-desert-night mb-4">Nos Expéditions</h1>
            <p className="text-gray-500">Découvrez l'itinéraire qui marquera votre vie.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher un voyage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-sand-200 focus:outline-none focus:border-sahara-gold transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden p-3 bg-white border border-sand-200 rounded-xl text-desert-night"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-10">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-desert-night mb-6">Catégories</h4>
              <div className="space-y-3">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      onClick={() => toggleCategory(cat)}
                      className={cn(
                        "w-5 h-5 rounded border transition-all flex items-center justify-center",
                        selectedCategory.includes(cat) ? "bg-sahara-gold border-sahara-gold" : "bg-white border-sand-300 group-hover:border-sahara-gold"
                      )}
                    >
                      {selectedCategory.includes(cat) && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-sm text-gray-600 capitalize">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-desert-night mb-6">Prix Maximum</h4>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-sahara-gold"
              />
              <div className="flex justify-between mt-2 text-xs font-bold text-gray-400">
                <span>0 MAD</span>
                <span>{priceRange[1]} MAD</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setSelectedCategory([]);
                setPriceRange([0, 10000]);
                setSearchQuery('');
              }}
              className="w-full py-3 text-sm font-bold text-sahara-red border border-sahara-red/20 rounded-xl hover:bg-sahara-red hover:text-white transition-all"
            >
              Réinitialiser les filtres
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-500 font-medium">
                <span className="text-desert-night font-bold">{filteredTours.length}</span> voyages trouvés
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Trier par:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-sm font-bold text-desert-night focus:outline-none cursor-pointer"
                  >
                    <option value="popularité">Popularité</option>
                    <option value="prix-croissant">Prix croissant</option>
                    <option value="prix-decroissant">Prix décroissant</option>
                    <option value="note">Note moyenne</option>
                  </select>
                </div>
                <div className="hidden md:flex items-center bg-sand-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setView('grid')}
                    className={cn("p-1.5 rounded-md transition-all", view === 'grid' ? "bg-white shadow-sm text-sahara-gold" : "text-gray-400")}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    onClick={() => setView('list')}
                    className={cn("p-1.5 rounded-md transition-all", view === 'list' ? "bg-white shadow-sm text-sahara-gold" : "text-gray-400")}
                  >
                    <ListIcon size={18} />
                  </button>
                </div>
              </div>
            </div>

            {filteredTours.length > 0 ? (
              <div className={cn(
                "grid gap-8",
                view === 'grid' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              )}>
                {filteredTours.map(tour => (
                  <TourCard key={tour.id} tour={tour} layout={view} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <div className="w-20 h-20 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-desert-night mb-2">Aucun voyage trouvé</h3>
                <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-desert-night/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-80 bg-white z-[101] p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-display font-bold">Filtres</h3>
                <button onClick={() => setIsFilterDrawerOpen(false)} className="p-2 hover:bg-sand-50 rounded-full">
                  <X size={24} />
                </button>
              </div>
              {/* Reuse filter logic here */}
              <div className="space-y-10">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-desert-night mb-6">Catégories</h4>
                  <div className="space-y-3">
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedCategory.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="w-5 h-5 accent-sahara-gold"
                        />
                        <span className="text-sm text-gray-600 capitalize">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full btn-primary py-4"
                >
                  Appliquer les filtres
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
