import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Star, Clock, Users, MapPin, Check, X, 
  Calendar, Info, ShieldCheck, Share2, Heart, ChevronRight, Send, ChevronDown, Compass
} from 'lucide-react';
import { TOURS, GUIDES } from '../data';
import { formatPrice, cn, generateId } from '../lib/utils';
import { useStore } from '../store';
import { toast } from '../components/Toast';

export const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tours, favorites, toggleFavorite, addReview } = useStore();
  const tour = tours.find(t => t.id === id);
  const [activeTab, setActiveTab] = useState('aperçu');
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [newReview, setNewReview] = useState({
    author: '',
    avatar: '',
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    text: ''
  });

  if (!tour) return <div>Tour non trouvé</div>;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review = {
      id: generateId(),
      author: newReview.author,
      avatar: newReview.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${newReview.author}`,
      rating: newReview.rating,
      date: newReview.date,
      text: newReview.text,
      tourId: tour.id
    };

    addReview(tour.id, review);
    toast.success("Merci pour votre avis !");
    setNewReview({
      author: '',
      avatar: '',
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      text: ''
    });
  };

  const isFavorite = favorites.includes(tour.id);
  const guide = GUIDES[0]; // Simplified for demo

  return (
    <div className="pt-24 pb-24 bg-sand-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          <Link to="/" className="hover:text-sahara-gold transition-colors">Accueil</Link>
          <ChevronRight size={12} />
          <Link to="/tours" className="hover:text-sahara-gold transition-colors">Voyages</Link>
          <ChevronRight size={12} />
          <span className="text-desert-night">{tour.title}</span>
        </nav>

        {/* Hero Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8 space-y-4">
            <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={tour.gallery[selectedImage]} 
                alt={tour.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 flex gap-3">
                <span className="bg-sahara-gold text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  {tour.category}
                </span>
                <span className={cn(
                  "text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg",
                  tour.difficulty === 'facile' ? "bg-oasis-green" : "bg-sahara-orange"
                )}>
                  {tour.difficulty}
                </span>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {tour.gallery.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0",
                    selectedImage === i ? "border-sahara-gold scale-105 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-white rounded-3xl p-8 shadow-2xl border border-sand-100">
              <div className="flex items-end gap-2 mb-8">
                <span className="text-4xl font-bold text-desert-night">{formatPrice(tour.price.perPerson)}</span>
                <span className="text-gray-400 text-sm mb-1">/ personne</span>
              </div>

              <div className="space-y-6 mb-8">
                <div className="p-4 bg-sand-50 rounded-2xl border border-sand-100">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Prochaines disponibilités</p>
                  <div className="space-y-2">
                    {tour.availability.map((avail, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="font-medium">{avail.date}</span>
                        <span className={cn(
                          "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                          avail.status === 'available' ? "text-oasis-green bg-oasis-green/10" : "text-sahara-orange bg-sahara-orange/10"
                        )}>
                          {avail.spotsLeft} places
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-sand-50 rounded-2xl border border-sand-100">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Durée</p>
                    <p className="font-bold">{tour.duration.days} Jours</p>
                  </div>
                  <div className="flex-1 p-4 bg-sand-50 rounded-2xl border border-sand-100">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Groupe</p>
                    <p className="font-bold">Max {tour.groupSize.max}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/booking/${tour.id}`)}
                className="w-full btn-primary py-4 mb-4"
              >
                Réserver Maintenant
              </button>

              <div className="flex gap-3 mb-8">
                <button 
                  onClick={() => toggleFavorite(tour.id)}
                  className={cn(
                    "flex-1 py-3 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all",
                    isFavorite ? "bg-sahara-red border-sahara-red text-white" : "border-sand-200 text-desert-night hover:bg-sand-50"
                  )}
                >
                  <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                  {isFavorite ? "Favori" : "Ajouter"}
                </button>
                <button className="p-3 rounded-xl border border-sand-200 text-desert-night hover:bg-sand-50 transition-all">
                  <Share2 size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, text: "Annulation gratuite 48h" },
                  { icon: ShieldCheck, text: "Paiement sécurisé" },
                  { icon: ShieldCheck, text: "Meilleur prix garanti" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-gray-500">
                    <item.icon size={16} className="text-oasis-green" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="lg:w-2/3">
          <div className="flex border-b border-sand-200 mb-10 overflow-x-auto no-scrollbar">
            {['aperçu', 'itinéraire', 'inclus', 'guide', 'avis'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap",
                  activeTab === tab ? "text-sahara-gold" : "text-gray-400 hover:text-desert-night"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-sahara-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            {activeTab === 'aperçu' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                <div>
                  <h2 className="text-3xl font-display font-bold mb-6">À propos de ce voyage</h2>
                  <p className="text-gray-600 leading-relaxed mb-8">{tour.longDescription}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-sand-100">
                        <div className="w-8 h-8 bg-sahara-gold/10 text-sahara-gold rounded-full flex items-center justify-center shrink-0">
                          <Check size={16} />
                        </div>
                        <span className="text-sm font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'itinéraire' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {tour.itinerary.map((day, i) => (
                  <div key={i} className="bg-white rounded-3xl border border-sand-100 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-sand-50 transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-sahara-gold text-white rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-lg shadow-sahara-gold/20">
                          <span className="text-[10px] uppercase font-bold leading-none mb-1">Jour</span>
                          <span className="text-lg font-bold leading-none">{day.day}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-display font-bold text-desert-night">{day.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                              <Compass size={14} className="text-sahara-gold" />
                              {day.activities.length} activités
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                              <MapPin size={14} className="text-sahara-gold" />
                              {day.accommodation.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedDay === day.day ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400"
                      >
                        <ChevronDown size={24} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedDay === day.day && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-8 pt-2 border-t border-sand-50">
                            <div className="pl-[72px] space-y-6">
                              <p className="text-gray-600 leading-relaxed text-sm">
                                {day.description}
                              </p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-4">Activités du jour</h4>
                                  <div className="space-y-3">
                                    {day.activities.map((act, j) => (
                                      <div key={j} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-sahara-gold rounded-full" />
                                        <span className="text-sm text-desert-night font-medium">{act}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-4 bg-sand-50 rounded-2xl border border-sand-100">
                                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Hébergement</h4>
                                    <p className="text-xs font-bold text-desert-night">{day.accommodation.name}</p>
                                    <p className="text-[10px] text-gray-400">{day.accommodation.type}</p>
                                  </div>
                                  <div className="p-4 bg-sand-50 rounded-2xl border border-sand-100">
                                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Repas</h4>
                                    <div className="flex flex-wrap gap-1">
                                      {day.meals.map((meal, m) => (
                                        <span key={m} className="text-[10px] font-bold text-sahara-gold bg-sahara-gold/10 px-2 py-0.5 rounded">
                                          {meal}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'inclus' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2 text-oasis-green">
                    <Check size={24} /> Ce qui est inclus
                  </h3>
                  <ul className="space-y-4">
                    {tour.included.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                        <div className="w-1.5 h-1.5 bg-oasis-green rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2 text-sahara-red">
                    <X size={24} /> Ce qui n'est pas inclus
                  </h3>
                  <ul className="space-y-4">
                    {tour.excluded.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                        <div className="w-1.5 h-1.5 bg-sahara-red rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'guide' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-white p-8 rounded-3xl border border-sand-100 flex flex-col md:flex-row gap-8">
                  <img src={guide.photo} alt={guide.name} className="w-32 h-32 rounded-2xl object-cover shadow-lg" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-display font-bold">{guide.name}</h3>
                        <p className="text-sahara-gold font-bold text-sm">{guide.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sahara-gold font-bold">
                        <Star size={18} fill="currentColor" /> {guide.rating}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{guide.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {guide.languages.map(lang => (
                        <span key={lang} className="bg-sand-50 text-gray-500 text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-sand-100">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'avis' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                {/* Reviews List */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-display font-bold">Avis des voyageurs ({tour.rating.count})</h3>
                    <div className="flex items-center gap-2 text-sahara-gold font-bold">
                      <Star size={24} fill="currentColor" />
                      <span className="text-2xl">{tour.rating.average}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {tour.reviews.length > 0 ? tour.reviews.map((review) => (
                      <div key={review.id} className="bg-white p-6 rounded-3xl border border-sand-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                            <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full object-cover border-2 border-sand-100" />
                            <div>
                              <h4 className="font-bold text-desert-night">{review.author}</h4>
                              <p className="text-xs text-gray-400">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sahara-gold">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed italic">"{review.text}"</p>
                      </div>
                    )) : (
                      <div className="py-12 text-center bg-white rounded-3xl border border-sand-100 italic text-gray-400">
                        Soyez le premier à laisser un avis !
                      </div>
                    )}
                  </div>
                </div>

                {/* Review Form */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-sand-100">
                  <h3 className="text-xl font-display font-bold mb-6">Laissez votre avis</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Votre Nom</label>
                        <input 
                          type="text" 
                          required 
                          value={newReview.author}
                          onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                          className="w-full p-4 bg-sand-50 rounded-2xl border border-sand-200 focus:outline-none focus:border-sahara-gold" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">URL de l'avatar (optionnel)</label>
                        <input 
                          type="text" 
                          value={newReview.avatar}
                          onChange={(e) => setNewReview({ ...newReview, avatar: e.target.value })}
                          placeholder="https://picsum.photos/seed/user/100/100"
                          className="w-full p-4 bg-sand-50 rounded-2xl border border-sand-200 focus:outline-none focus:border-sahara-gold" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Note</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                              className={cn(
                                "p-2 rounded-lg transition-all",
                                newReview.rating >= star ? "text-sahara-gold" : "text-gray-300"
                              )}
                            >
                              <Star size={24} fill={newReview.rating >= star ? "currentColor" : "none"} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Date</label>
                        <input 
                          type="date" 
                          required 
                          value={newReview.date}
                          onChange={(e) => setNewReview({ ...newReview, date: e.target.value })}
                          className="w-full p-4 bg-sand-50 rounded-2xl border border-sand-200 focus:outline-none focus:border-sahara-gold" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Votre Avis</label>
                      <textarea 
                        required 
                        value={newReview.text}
                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                        className="w-full p-4 bg-sand-50 rounded-2xl border border-sand-200 focus:outline-none focus:border-sahara-gold h-32" 
                      />
                    </div>
                    <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                      Publier l'avis <Send size={18} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
