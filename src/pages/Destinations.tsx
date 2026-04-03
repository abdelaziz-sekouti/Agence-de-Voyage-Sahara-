import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { DESTINATIONS } from '../data';
import { motion } from 'motion/react';
import { MapPin, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

// Fix Leaflet icon issue
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const customIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #d4a24e; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

export const Destinations = () => {
  const [activeRegion, setActiveRegion] = useState('Toutes');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = ["Toutes", "Draa Valley", "Erg Chebbi", "Erg Chigaga", "Atlas Mountains", "Fès", "Marrakech"];

  const filteredDestinations = DESTINATIONS.filter(d => {
    const matchesRegion = activeRegion === 'Toutes' || d.region === activeRegion;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-sand-50">
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img src="https://picsum.photos/seed/destinationshero/1920/1080" alt="Destinations" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-desert-night/40 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">Nos Destinations</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Chercher une ville, un désert..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl shadow-2xl focus:outline-none text-desert-night"
            />
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-12">
            <MapContainer center={[31.7917, -7.0926]} zoom={6} scrollWheelZoom={false}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {DESTINATIONS.map(dest => (
                <Marker key={dest.id} position={dest.coordinates} icon={customIcon}>
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-display font-bold text-lg mb-1">{dest.name}</h4>
                      <p className="text-xs text-gray-500 mb-3">{dest.region}</p>
                      <Link to={`/destination/${dest.id}`} className="text-xs font-bold text-sahara-gold flex items-center gap-1">
                        Voir <ArrowRight size={12} />
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar mb-12">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                  activeRegion === region ? "bg-sahara-gold border-sahara-gold text-white shadow-lg" : "bg-white border-sand-200 text-gray-500 hover:border-sahara-gold hover:text-sahara-gold"
                )}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredDestinations.map((dest, i) => (
              <motion.div key={dest.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-sand-100">
                <Link to={`/destination/${dest.id}`} className="block relative h-48 overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-desert-night/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white font-display font-bold text-xl">{dest.name}</span>
                  </div>
                </Link>
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">{dest.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sahara-gold">{dest.region}</span>
                    <Link to={`/destination/${dest.id}`} className="p-2 bg-sand-50 rounded-lg text-desert-night hover:bg-sahara-gold hover:text-white transition-all">
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
