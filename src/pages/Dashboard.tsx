import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Briefcase, Heart, User, LogOut, ChevronRight, Clock, Star, MapPin, Calendar, Users } from 'lucide-react';
import { useStore } from '../store';
import { TOURS } from '../data';
import { formatPrice, cn } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user, bookings, favorites, logout } = useStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Veuillez vous connecter</h2>
        <Link to="/login" className="btn-primary">Connexion</Link>
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
              <div className="w-24 h-24 bg-sahara-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={48} className="text-sahara-gold" />
              </div>
              <h3 className="text-xl font-display font-bold">{user.name}</h3>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>

            <nav className="bg-white rounded-3xl shadow-sm border border-sand-100 overflow-hidden">
              {[
                { icon: LayoutDashboard, label: "Vue d'ensemble", active: true },
                { icon: Briefcase, label: "Mes Réservations" },
                { icon: Heart, label: "Mes Favoris" },
                { icon: User, label: "Mon Profil" },
              ].map((item, i) => (
                <button key={i} className={cn(
                  "w-full flex items-center gap-4 px-8 py-4 text-sm font-bold transition-all",
                  item.active ? "bg-sahara-gold text-white" : "text-gray-500 hover:bg-sand-50"
                )}>
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
              <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-4 px-8 py-4 text-sm font-bold text-sahara-red hover:bg-sahara-red/5 transition-all">
                <LogOut size={20} />
                Déconnexion
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12">
            <header>
              <h1 className="text-4xl font-display font-bold text-desert-night mb-2">Bonjour, {user.name.split(' ')[0]} !</h1>
              <p className="text-gray-500">Heureux de vous revoir. Voici un aperçu de vos aventures.</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Réservations", value: bookings.length, color: "bg-sahara-gold" },
                { label: "Favoris", value: favorites.length, color: "bg-sahara-red" },
                { label: "Points Fidélité", value: 450, color: "bg-oasis-green" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-sand-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold text-desert-night">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold">Réservations Récentes</h2>
                <button className="text-sm font-bold text-sahara-gold hover:underline">Voir tout</button>
              </div>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map(booking => {
                    const tour = TOURS.find(t => t.id === booking.tourId);
                    return (
                      <div key={booking.id} className="bg-white p-6 rounded-3xl shadow-sm border border-sand-100 flex flex-col md:flex-row items-center gap-6">
                        <img src={tour?.gallery[0]} className="w-20 h-20 rounded-2xl object-cover" />
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">{tour?.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {booking.date}</span>
                            <span className="flex items-center gap-1"><Users size={12} /> {booking.travelers.adults + booking.travelers.children} pers.</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sahara-gold mb-1">{formatPrice(booking.totalPrice)}</p>
                          <span className="text-[10px] font-bold uppercase px-3 py-1 bg-oasis-green/10 text-oasis-green rounded-full">Confirmée</span>
                        </div>
                        <button className="p-2 hover:bg-sand-50 rounded-full"><ChevronRight size={20} /></button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-dashed border-sand-300 text-center">
                  <p className="text-gray-400 mb-6">Vous n'avez pas encore de réservation.</p>
                  <Link to="/tours" className="btn-primary">Explorer les voyages</Link>
                </div>
              )}
            </section>

            {/* Favorites */}
            <section>
              <h2 className="text-2xl font-display font-bold mb-6">Mes Favoris</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favoriteTours.map(tour => (
                  <div key={tour.id} className="bg-white p-4 rounded-3xl shadow-sm border border-sand-100 flex gap-4">
                    <img src={tour.gallery[0]} className="w-24 h-24 rounded-2xl object-cover" />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-bold text-sm mb-1">{tour.title}</h4>
                        <p className="text-xs text-gray-400">{tour.duration.days} jours</p>
                      </div>
                      <Link to={`/tour/${tour.id}`} className="text-xs font-bold text-sahara-gold hover:underline">Voir le voyage</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
