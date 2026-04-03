import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Briefcase, Users, MessageSquare, Settings, Plus, Search, Edit2, Trash2, TrendingUp, DollarSign, CheckCircle, ChevronDown, Star } from 'lucide-react';
import { TOURS, GUIDES } from '../data';
import { formatPrice, cn } from '../lib/utils';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const Admin = () => {
  const { user, bookings, tours, messages, updateBooking, deleteBooking, updateTour, deleteTour, updateMessage, deleteMessage } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user || user.role !== 'admin') {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Accès Refusé</h2>
        <button onClick={() => navigate('/')} className="btn-primary">Retour à l'accueil</button>
      </div>
    );
  }

  const revenueData = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Revenus (MAD)',
        data: [45000, 52000, 48000, 65000, 58000, 72000],
        borderColor: '#d4a24e',
        backgroundColor: 'rgba(212, 162, 78, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const statusData = {
    labels: ['Confirmé', 'En attente', 'Annulé'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ['#4a9e6e', '#d4a24e', '#c45a3c'],
        borderWidth: 0,
      },
    ],
  };

  const filteredBookings = bookings.filter(b => 
    b.personalInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTours = tours.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 min-h-screen bg-sand-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-desert-night text-white shrink-0 hidden lg:flex flex-col sticky top-24 h-[calc(100vh-6rem)]">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-xl font-display font-bold text-sahara-gold">Sahara Admin</h2>
          <p className="text-[10px] uppercase tracking-widest opacity-50">Gestion de l'agence</p>
        </div>
        <nav className="flex-1 py-8">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Vue d\'ensemble' },
            { id: 'tours', icon: Briefcase, label: 'Voyages' },
            { id: 'bookings', icon: CheckCircle, label: 'Réservations' },
            { id: 'clients', icon: Users, label: 'Clients' },
            { id: 'messages', icon: MessageSquare, label: 'Messages' },
            { id: 'settings', icon: Settings, label: 'Paramètres' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSearchQuery('');
              }}
              className={cn(
                "w-full flex items-center gap-4 px-8 py-4 text-sm font-medium transition-all",
                activeTab === item.id ? "bg-sahara-gold text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-display font-bold text-desert-night mb-2">Tableau de Bord</h1>
                <p className="text-gray-500">Aperçu des performances de l'agence.</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-white px-4 py-2 rounded-xl border border-sand-200 text-sm font-bold flex items-center gap-2">
                  Exporter <ChevronDown size={16} />
                </button>
                <button onClick={() => setActiveTab('tours')} className="btn-primary py-2 px-6 text-sm flex items-center gap-2">
                  <Plus size={18} /> Nouveau Voyage
                </button>
              </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Revenus du mois", value: "72,000 MAD", icon: DollarSign, trend: "+12%" },
                { label: "Réservations", value: bookings.length.toString(), icon: CheckCircle, trend: "+5%" },
                { label: "Nouveaux Clients", value: "124", icon: Users, trend: "+18%" },
                { label: "Note Moyenne", value: "4.9/5", icon: Star, trend: "Stable" },
              ].map((kpi, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-sand-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-sand-50 text-sahara-gold rounded-xl">
                      <kpi.icon size={24} />
                    </div>
                    <span className="text-xs font-bold text-oasis-green">{kpi.trend}</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold text-desert-night">{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-sand-100">
                <h3 className="text-xl font-display font-bold mb-8">Évolution des Revenus</h3>
                <div className="h-[300px]">
                  <Line data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand-100">
                <h3 className="text-xl font-display font-bold mb-8">Statut des Réservations</h3>
                <div className="h-[300px] flex items-center justify-center">
                  <Pie data={statusData} />
                </div>
              </div>
            </div>

            {/* Recent Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-sand-100 overflow-hidden">
              <div className="p-8 border-b border-sand-50 flex justify-between items-center">
                <h3 className="text-xl font-display font-bold">Réservations Récentes</h3>
                <button onClick={() => setActiveTab('bookings')} className="text-sahara-gold text-sm font-bold hover:underline">Voir tout</button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-sand-50 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  <tr>
                    <th className="px-8 py-4">Client</th>
                    <th className="px-8 py-4">Voyage</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Montant</th>
                    <th className="px-8 py-4">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-50">
                  {bookings.slice(0, 5).map(b => {
                    const tour = tours.find(t => t.id === b.tourId);
                    return (
                      <tr key={b.id} className="text-sm hover:bg-sand-50 transition-colors">
                        <td className="px-8 py-4 font-bold">{b.personalInfo.fullName}</td>
                        <td className="px-8 py-4 text-gray-500">{tour?.title}</td>
                        <td className="px-8 py-4 text-gray-500">{b.date}</td>
                        <td className="px-8 py-4 font-bold text-sahara-gold">{formatPrice(b.totalPrice)}</td>
                        <td className="px-8 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                            b.status === 'confirmed' ? "bg-oasis-green/10 text-oasis-green" : "bg-sahara-gold/10 text-sahara-gold"
                          )}>{b.status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'tours' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-display font-bold text-desert-night mb-2">Gestion des Voyages</h1>
                <p className="text-gray-500">Ajoutez, modifiez ou supprimez vos offres de voyage.</p>
              </div>
              <button className="btn-primary py-2 px-6 text-sm flex items-center gap-2">
                <Plus size={18} /> Nouveau Voyage
              </button>
            </header>

            <div className="bg-white rounded-3xl shadow-sm border border-sand-100 overflow-hidden">
              <div className="p-8 border-b border-sand-50 flex justify-between items-center">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Rechercher un voyage..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-sand-50 rounded-xl border border-sand-200 text-sm focus:outline-none" 
                  />
                </div>
              </div>
              <table className="w-full text-left">
                <thead className="bg-sand-50 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  <tr>
                    <th className="px-8 py-4">Voyage</th>
                    <th className="px-8 py-4">Catégorie</th>
                    <th className="px-8 py-4">Prix</th>
                    <th className="px-8 py-4">Difficulté</th>
                    <th className="px-8 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-50">
                  {filteredTours.map(t => (
                    <tr key={t.id} className="text-sm hover:bg-sand-50 transition-colors">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-4">
                          <img src={t.gallery[0]} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-bold">{t.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-gray-500 capitalize">{t.category}</td>
                      <td className="px-8 py-4 font-bold text-sahara-gold">{formatPrice(t.price.perPerson)}</td>
                      <td className="px-8 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                          t.difficulty === 'facile' ? "bg-oasis-green/10 text-oasis-green" : "bg-sahara-orange/10 text-sahara-orange"
                        )}>{t.difficulty}</span>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-sand-100 rounded-lg text-gray-400 hover:text-desert-night"><Edit2 size={16} /></button>
                          <button onClick={() => deleteTour(t.id)} className="p-2 hover:bg-sahara-red/10 rounded-lg text-gray-400 hover:text-sahara-red"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'bookings' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <header>
              <h1 className="text-4xl font-display font-bold text-desert-night mb-2">Réservations</h1>
              <p className="text-gray-500">Gérez les demandes de réservation de vos clients.</p>
            </header>

            <div className="bg-white rounded-3xl shadow-sm border border-sand-100 overflow-hidden">
              <div className="p-8 border-b border-sand-50 flex justify-between items-center">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Rechercher par client ou référence..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-sand-50 rounded-xl border border-sand-200 text-sm focus:outline-none" 
                  />
                </div>
              </div>
              <table className="w-full text-left">
                <thead className="bg-sand-50 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  <tr>
                    <th className="px-8 py-4">Référence</th>
                    <th className="px-8 py-4">Client</th>
                    <th className="px-8 py-4">Voyage</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Statut</th>
                    <th className="px-8 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-50">
                  {filteredBookings.map(b => {
                    const tour = tours.find(t => t.id === b.tourId);
                    return (
                      <tr key={b.id} className="text-sm hover:bg-sand-50 transition-colors">
                        <td className="px-8 py-4 font-mono text-xs font-bold text-sahara-gold">{b.reference}</td>
                        <td className="px-8 py-4 font-bold">{b.personalInfo.fullName}</td>
                        <td className="px-8 py-4 text-gray-500">{tour?.title}</td>
                        <td className="px-8 py-4 text-gray-500">{b.date}</td>
                        <td className="px-8 py-4">
                          <select 
                            value={b.status}
                            onChange={(e) => updateBooking(b.id, { status: e.target.value as any })}
                            className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-transparent border-none focus:ring-0 cursor-pointer",
                              b.status === 'confirmed' ? "text-oasis-green" : "text-sahara-gold"
                            )}
                          >
                            <option value="pending">En attente</option>
                            <option value="confirmed">Confirmée</option>
                            <option value="cancelled">Annulée</option>
                            <option value="completed">Terminée</option>
                          </select>
                        </td>
                        <td className="px-8 py-4">
                          <button onClick={() => deleteBooking(b.id)} className="p-2 hover:bg-sahara-red/10 rounded-lg text-gray-400 hover:text-sahara-red"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <header>
              <h1 className="text-4xl font-display font-bold text-desert-night mb-2">Messages</h1>
              <p className="text-gray-500">Répondez aux demandes de contact.</p>
            </header>

            <div className="grid grid-cols-1 gap-6">
              {filteredMessages.length > 0 ? filteredMessages.map(m => (
                <div key={m.id} className={cn(
                  "bg-white p-6 rounded-3xl shadow-sm border transition-all",
                  m.status === 'unread' ? "border-sahara-gold bg-sahara-gold/5" : "border-sand-100"
                )}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-sand-100 rounded-full flex items-center justify-center text-sahara-gold font-bold">
                        {m.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-desert-night">{m.name}</h4>
                        <p className="text-xs text-gray-400">{m.email} • {m.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => updateMessage(m.id, { status: 'read' })} className="p-2 hover:bg-sand-100 rounded-lg text-gray-400"><CheckCircle size={18} /></button>
                      <button onClick={() => deleteMessage(m.id)} className="p-2 hover:bg-sahara-red/10 rounded-lg text-gray-400 hover:text-sahara-red"><Trash2 size={18} /></button>
                    </div>
                  </div>
                  <h5 className="font-bold text-sm mb-2">{m.subject}</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">{m.message}</p>
                </div>
              )) : (
                <div className="py-24 text-center bg-white rounded-3xl border border-sand-100">
                  <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-400">Aucun message pour le moment.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};
