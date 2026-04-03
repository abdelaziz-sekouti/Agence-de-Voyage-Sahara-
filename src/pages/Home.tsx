import React from 'react';
import { motion } from 'motion/react';
import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { TourCard } from '../components/TourCard';
import { TOURS, DESTINATIONS, TESTIMONIALS } from '../data';
import { ArrowRight, MapPin, Compass, Shield, Heart, Quote, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const featuredTours = TOURS.filter(t => t.featured);
  const featuredDestinations = DESTINATIONS.filter(d => d.featured);

  return (
    <div className="overflow-hidden">
      <Hero />
      <TrustBar />

      {/* Featured Tours Carousel */}
      <section className="py-24 bg-sand-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-desert-night mb-4">Expéditions Vedettes</h2>
              <p className="text-gray-500 max-w-xl">Nos itinéraires les plus plébiscités, conçus pour une immersion totale.</p>
            </div>
            <Link to="/tours" className="hidden md:flex items-center gap-2 text-sahara-gold font-bold hover:gap-3 transition-all">
              Voir tout <ArrowRight size={20} />
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {featuredTours.map((tour) => (
              <div key={tour.id} className="min-w-[300px] md:min-w-[400px] snap-start">
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-desert-night mb-4">Pourquoi Nous Choisir ?</h2>
            <div className="w-24 h-1 bg-sahara-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Compass, title: "Guides Locaux Experts", desc: "Nés dans le désert, nos guides partagent leurs secrets avec passion." },
              { icon: Map, title: "Itinéraires Authentiques", desc: "Des parcours exclusifs loin des sentiers battus touristiques." },
              { icon: Shield, title: "Confort Premium", desc: "Bivouacs de luxe et logistique soignée pour votre sérénité." },
              { icon: Heart, title: "Support 24/7", desc: "Une équipe dédiée à votre écoute avant, pendant et après le voyage." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-sand-50 hover:bg-white hover:shadow-xl transition-all duration-500 border border-sand-100"
              >
                <div className="w-14 h-14 bg-sahara-gold/10 text-sahara-gold rounded-xl flex items-center justify-center mb-6">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-24 bg-sand-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-desert-night mb-4">Destinations de Rêve</h2>
            <p className="text-gray-500">Explorez les joyaux du Sahara marocain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg"
              >
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-desert-night/90 via-desert-night/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-sahara-gold text-xs font-bold uppercase tracking-widest mb-2">{dest.region}</p>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">{dest.name}</h3>
                  <Link to={`/destination/${dest.id}`} className="inline-flex items-center gap-2 text-white text-sm font-bold group-hover:gap-3 transition-all">
                    Découvrir <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-desert-night text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ce que disent nos voyageurs</h2>
              <p className="text-gray-400 mb-8">Des souvenirs gravés à jamais dans le sable et les cœurs.</p>
              <div className="flex gap-4">
                <div className="p-4 bg-white/5 rounded-2xl">
                  <p className="text-3xl font-bold text-sahara-gold">4.9/5</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Note moyenne</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl">
                  <p className="text-3xl font-bold text-sahara-gold">1200+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Avis vérifiés</p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full overflow-hidden">
              <div className="flex gap-6 animate-scroll">
                {TESTIMONIALS.slice(0, 5).map((t) => (
                  <div key={t.id} className="min-w-[350px] bg-white/5 p-8 rounded-3xl border border-white/10">
                    <Quote className="text-sahara-gold mb-6" size={32} />
                    <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-bold">{t.name}</p>
                        <p className="text-xs text-sahara-gold">{t.tourName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
