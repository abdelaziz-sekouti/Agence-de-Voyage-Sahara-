import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Briefcase, Heart, User, LogOut, ChevronRight, Clock, Star, MapPin, Calendar, Users, Plus, Compass } from 'lucide-react';
import { useStore } from '../store';
import { TOURS, DESTINATIONS } from '../data';
import { formatPrice, cn } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user, bookings, favorites, plannedTrips, logout } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Veuillez vous connecter</h2>
        <Link to="/auth" className="btn-primary">Connexion</Link>
      </div>
    );
  }

  const favoriteTours = TOURS.filter(t => favorites.includes(t.id));

  return (
    <div className="pt-32 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand-100 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4 group">
                <div className="w-full h-full bg-sahara-gold/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-sahara-gold/20">
                  {user.avatar ? (
                    <img src={user.avatar} className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-sahara-gold" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-sand-100 text-sahara-gold hover:bg-sahara-gold hover:text-white transition-all">
                  <Plus size={14} />
                </button>
              </div>
              <h3 className="text-xl font-display font-bold">{user.name}</h3>
              <p className="text-sm text-gray-400">{user.email}</p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="px-3 py-1 bg-sahara-gold/10 text-sahara-gold rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {user.role === 'admin' ? 'Administrateur' : 'Voyageur'}
                </span>
              </div>
            </div>

            <nav className="bg-white rounded-3xl shadow-sm border border-sand-100 overflow-hidden">
              {[
                { id: 'overview', icon: LayoutDashboard, label: "Vue d'ensemble" },
                { id: 'bookings', icon: Briefcase, label: "Mes Réservations" },
                { id: 'planned', icon: Compass, label: "Mes Projets" },
                { id: 'favorites', icon: Heart, label: "Mes Favoris" },
                { id: 'profile', icon: User, label: "Mon Profil" },
              ].map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-8 py-4 text-sm font-bold transition-all",
                    activeTab === item.id ? "bg-sahara-gold text-white" : "text-gray-500 hover:bg-sand-50"
                  )}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
              <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-4 px-8 py-4 text-sm font-bold text-sahara-red hover:bg-sahara-red/5 transition-all border-t border-sand-50">
                <LogOut size={20} />
                Déconnexion
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12">
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                <header>
                  <h1 className="text-4xl font-display font-bold text-desert-night mb-2">Bonjour, {user.name.split(' ')[0]} !</h1>
                  <p className="text-gray-500">Heureux de vous revoir. Voici un aperçu de vos aventures.</p>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Réservations", value: bookings.length, icon: Briefcase, color: "text-sahara-gold" },
                    { label: "Projets", value: plannedTrips.length, icon: Compass, color: "text-sahara-orange" },
                    { label: "Favoris", value: favorites.length, icon: Heart, color: "text-sahara-red" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-sand-100 flex items-center gap-6">
                      <div className={cn("p-4 rounded-2xl bg-sand-50", stat.color)}>
                        <stat.icon size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-desert-night">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Bookings */}
                  <section className="bg-white p-8 rounded-3xl shadow-sm border border-sand-100">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-xl font-display font-bold">Dernière Réservation</h2>
                      <button onClick={() => setActiveTab('bookings')} className="text-xs font-bold text-sahara-gold hover:underline">Voir tout</button>
                    </div>
                    {bookings.length > 0 ? (
                      <div className="space-y-6">
                        {bookings.slice(0, 1).map(booking => {
                          const tour = TOURS.find(t => t.id === booking.tourId);
                          return (
                            <div key={booking.id} className="space-y-4">
                              <img src={tour?.gallery[0]} className="w-full h-40 rounded-2xl object-cover shadow-lg" />
                              <div>
                                <h4 className="font-bold text-lg mb-1">{tour?.title}</h4>
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                  <span className="flex items-center gap-1"><Calendar size={12} /> {booking.date}</span>
                                  <span className="flex items-center gap-1"><Users size={12} /> {booking.travelers.adults + booking.travelers.children} pers.</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center pt-4 border-t border-sand-50">
                                <span className="text-xs font-bold uppercase px-3 py-1 bg-oasis-green/10 text-oasis-green rounded-full">Confirmée</span>
                                <p className="font-bold text-sahara-gold">{formatPrice(booking.totalPrice)}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-12 text-center border-2 border-dashed border-sand-100 rounded-2xl">
                        <p className="text-gray-400 text-sm mb-4">Aucune réservation.</p>
                        <Link to="/tours" className="text-sahara-gold font-bold text-sm hover:underline">Explorer les voyages</Link>
                      </div>
                    )}
                  </section>

                  {/* Recent Project */}
                  <section className="bg-white p-8 rounded-3xl shadow-sm border border-sand-100">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-xl font-display font-bold">Dernier Projet</h2>
                      <button onClick={() => setActiveTab('planned')} className="text-xs font-bold text-sahara-gold hover:underline">Voir tout</button>
                    </div>
                    {plannedTrips.length > 0 ? (
                      <div className="space-y-6">
                        {plannedTrips.slice(0, 1).map(trip => (
                          <div key={trip.id} className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                              {trip.destinations.slice(0, 2).map((destId, i) => {
                                const dest = DESTINATIONS.find(d => d.id === destId);
                                return <img key={i} src={dest?.image} className="w-full h-20 rounded-xl object-cover" />;
                              })}
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-1">{trip.destinations.length} Destinations</h4>
                              <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {trip.startDate || 'Non définie'}</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {trip.duration} jours</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-sand-50">
                              <span className="text-xs font-bold uppercase px-3 py-1 bg-sahara-orange/10 text-sahara-orange rounded-full">En projet</span>
                              <p className="font-bold text-sahara-gold">{formatPrice(trip.budget)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center border-2 border-dashed border-sand-100 rounded-2xl">
                        <p className="text-gray-400 text-sm mb-4">Aucun projet en cours.</p>
                        <Link to="/planner" className="text-sahara-gold font-bold text-sm hover:underline">Créer un itinéraire</Link>
                      </div>
                    )}
                  </section>
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-3xl font-display font-bold">Mes Réservations</h2>
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map(booking => {
                      const tour = TOURS.find(t => t.id === booking.tourId);
                      return (
                        <div key={booking.id} className="bg-white p-6 rounded-3xl shadow-sm border border-sand-100 flex flex-col md:flex-row items-center gap-6 group hover:shadow-xl transition-all">
                          <img src={tour?.gallery[0]} className="w-24 h-24 rounded-2xl object-cover" />
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1">{tour?.title}</h4>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span className="flex items-center gap-1"><Calendar size={12} /> {booking.date}</span>
                              <span className="flex items-center gap-1"><Users size={12} /> {booking.travelers.adults + booking.travelers.children} voyageurs</span>
                              <span className="font-mono text-[10px] uppercase tracking-widest">REF: {booking.reference}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sahara-gold mb-1">{formatPrice(booking.totalPrice)}</p>
                            <span className={cn(
                              "text-[10px] font-bold uppercase px-3 py-1 rounded-full",
                              booking.status === 'confirmed' ? "bg-oasis-green/10 text-oasis-green" : "bg-sahara-gold/10 text-sahara-gold"
                            )}>{booking.status}</span>
                          </div>
                          <button className="p-3 bg-sand-50 rounded-full text-gray-400 group-hover:bg-sahara-gold group-hover:text-white transition-all">
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white p-24 rounded-3xl border border-dashed border-sand-300 text-center">
                    <Briefcase size={48} className="mx-auto text-gray-200 mb-6" />
                    <p className="text-gray-400 mb-8">Vous n'avez pas encore de réservation.</p>
                    <Link to="/tours" className="btn-primary">Explorer les voyages</Link>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'planned' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-display font-bold">Mes Projets</h2>
                  <Link to="/planner" className="btn-primary py-2 px-6 text-sm flex items-center gap-2">
                    <Plus size={18} /> Nouveau Projet
                  </Link>
                </div>
                {plannedTrips.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plannedTrips.map(trip => (
                      <div key={trip.id} className="bg-white p-6 rounded-3xl shadow-sm border border-sand-100 space-y-6 hover:shadow-xl transition-all group">
                        <div className="grid grid-cols-3 gap-2 h-24">
                          {trip.destinations.slice(0, 3).map((destId, i) => {
                            const dest = DESTINATIONS.find(d => d.id === destId);
                            return <img key={i} src={dest?.image} className="w-full h-full rounded-xl object-cover" />;
                          })}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">{trip.destinations.length} Destinations</h4>
                          <div className="flex flex-wrap gap-2">
                            {trip.destinations.slice(0, 4).map(destId => {
                              const dest = DESTINATIONS.find(d => d.id === destId);
                              return <span key={destId} className="px-2 py-1 bg-sand-50 rounded-lg text-[10px] font-bold text-gray-500">{dest?.name}</span>;
                            })}
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-sand-50">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Budget Estimé</p>
                            <p className="font-bold text-sahara-gold">{formatPrice(trip.budget)}</p>
                          </div>
                          <button className="p-3 bg-sand-50 rounded-full text-gray-400 group-hover:bg-sahara-gold group-hover:text-white transition-all">
                            <Compass size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-24 rounded-3xl border border-dashed border-sand-300 text-center">
                    <Compass size={48} className="mx-auto text-gray-200 mb-6" />
                    <p className="text-gray-400 mb-8">Vous n'avez pas encore de projet de voyage.</p>
                    <Link to="/planner" className="btn-primary">Créer un itinéraire</Link>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'favorites' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-3xl font-display font-bold">Mes Favoris</h2>
                {favoriteTours.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteTours.map(tour => (
                      <div key={tour.id} className="bg-white p-4 rounded-3xl shadow-sm border border-sand-100 flex gap-6 group hover:shadow-xl transition-all">
                        <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-2xl">
                          <img src={tour.gallery[0]} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-2">
                          <div>
                            <h4 className="font-bold text-lg mb-1">{tour.title}</h4>
                            <p className="text-xs text-gray-400">{tour.duration.days} jours • {tour.category}</p>
                          </div>
                          <div className="flex justify-between items-end">
                            <p className="font-bold text-sahara-gold">{formatPrice(tour.price.perPerson)}</p>
                            <Link to={`/tour/${tour.id}`} className="text-xs font-bold text-sahara-gold hover:underline">Voir le voyage</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-24 rounded-3xl border border-dashed border-sand-300 text-center">
                    <Heart size={48} className="mx-auto text-gray-200 mb-6" />
                    <p className="text-gray-400 mb-8">Votre liste de favoris est vide.</p>
                    <Link to="/tours" className="btn-primary">Explorer les voyages</Link>
                  </div>
                )}
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
