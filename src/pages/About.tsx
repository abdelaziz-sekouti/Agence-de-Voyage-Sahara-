import React from 'react';
import { motion } from 'motion/react';
import { History, Target, Users, Award, ShieldCheck, Globe } from 'lucide-react';
import { GUIDES } from '../data';

export const About = () => {
  return (
    <div className="pt-24 pb-24 bg-sand-50">
      {/* Hero */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden mb-24">
        <img src="https://picsum.photos/seed/abouthero/1920/1080" alt="About" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-desert-night/50" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">Notre Histoire</h1>
          <p className="text-sand-100 text-xl font-light max-w-2xl mx-auto">Plus de 15 ans à partager la magie du désert avec le monde.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {/* Story */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sahara-gold/10 text-sahara-gold rounded-full text-xs font-bold uppercase tracking-widest">
              <History size={16} /> Depuis 2011
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-desert-night">Une passion née dans les dunes</h2>
            <p className="text-gray-600 leading-relaxed">
              L'Agence de Voyage Sahara est née de la rencontre entre des guides nomades passionnés et des voyageurs en quête d'authenticité. Notre mission a toujours été simple : offrir une immersion totale dans la culture et les paysages du Sahara, tout en préservant son écosystème fragile.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Aujourd'hui, nous sommes fiers d'être reconnus comme l'un des leaders du tourisme responsable au Maroc, avec une équipe de plus de 20 experts locaux.
            </p>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/seed/aboutstory/800/1000" alt="Story" className="rounded-[3rem] shadow-2xl" />
            <div className="absolute -bottom-10 -left-10 bg-sahara-gold p-10 rounded-3xl text-white hidden md:block">
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-80">Années d'expertise</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white rounded-[4rem] shadow-sm border border-sand-100 px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-desert-night mb-4">Nos Valeurs</h2>
            <div className="w-24 h-1 bg-sahara-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "Authenticité", desc: "Nous privilégions les rencontres réelles et les expériences sans artifice." },
              { icon: Target, title: "Responsabilité", desc: "Nous nous engageons à minimiser notre impact environnemental." },
              { icon: Globe, title: "Partage", desc: "Chaque voyage est une occasion d'échanger et d'apprendre." }
            ].map((v, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-sand-50 text-sahara-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <v.icon size={32} />
                </div>
                <h3 className="text-xl font-display font-bold">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-desert-night mb-4">Nos Guides Experts</h2>
            <p className="text-gray-500">Les visages de votre aventure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GUIDES.map((guide) => (
              <div key={guide.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-sand-100 group">
                <div className="h-64 overflow-hidden">
                  <img src={guide.photo} alt={guide.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8 text-center">
                  <h4 className="text-xl font-display font-bold mb-1">{guide.name}</h4>
                  <p className="text-sahara-gold text-xs font-bold uppercase tracking-widest mb-4">{guide.specialty}</p>
                  <p className="text-gray-500 text-sm line-clamp-3">{guide.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
