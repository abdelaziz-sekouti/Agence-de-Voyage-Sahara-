import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { toast } from '../components/Toast';
import { useStore } from '../store';
import { generateId } from '../lib/utils';

export const Contact = () => {
  const { addMessage } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Demande d\'information',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addMessage({
      id: generateId(),
      ...formData,
      status: 'unread',
      createdAt: new Date().toLocaleString()
    });

    toast.success("Message envoyé ! Nous vous répondrons sous 24h.");
    setFormData({ name: '', email: '', subject: 'Demande d\'information', message: '' });
  };

  return (
    <div className="pt-32 pb-24 bg-sand-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-display font-bold text-desert-night mb-6">Contactez-nous</h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                Une question sur nos expéditions ? Envie d'un voyage sur mesure ? Notre équipe d'experts est à votre écoute pour préparer votre aventure saharienne.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Phone, label: "Téléphone", value: "+212 5 24 44 55 66", sub: "Lun-Sam, 9h-18h" },
                { icon: Mail, label: "Email", value: "contact@sahara.ma", sub: "Réponse sous 24h" },
                { icon: MapPin, label: "Bureau", value: "Merzouga, Maroc", sub: "Avenue des Dunes" },
                { icon: Clock, label: "Support", value: "24/7", sub: "Pour nos voyageurs" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-sand-100">
                  <div className="w-10 h-10 bg-sahara-gold/10 text-sahara-gold rounded-xl flex items-center justify-center mb-4">
                    <item.icon size={20} />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">{item.label}</p>
                  <p className="font-bold text-desert-night mb-1">{item.value}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-desert-night rounded-3xl text-white">
              <h4 className="text-xl font-display font-bold mb-4">Suivez nos aventures</h4>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-sahara-gold transition-all">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-sand-100">
            <h3 className="text-2xl font-display font-bold mb-8">Envoyez un message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Nom complet</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 bg-sand-50 rounded-2xl border border-sand-200 focus:outline-none focus:border-sahara-gold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 bg-sand-50 rounded-2xl border border-sand-200 focus:outline-none focus:border-sahara-gold" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Sujet</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-4 bg-sand-50 rounded-2xl border border-sand-200 focus:outline-none focus:border-sahara-gold"
                >
                  <option>Demande d'information</option>
                  <option>Réservation de groupe</option>
                  <option>Voyage sur mesure</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-sand-50 rounded-2xl border border-sand-200 focus:outline-none focus:border-sahara-gold h-40" 
                />
              </div>
              <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                Envoyer le message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
