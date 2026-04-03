import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-desert-night text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col">
              <span className="text-3xl font-display font-bold tracking-tighter">SAHARA</span>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-sahara-gold">Voyages & Expéditions</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Spécialiste des expéditions premium dans le Sahara marocain. Nous créons des expériences authentiques et immersives pour les voyageurs en quête d'absolu.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-sahara-gold hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-sahara-gold hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-sahara-gold hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-sahara-gold hover:text-white transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/tours" className="hover:text-sahara-gold transition-colors">Nos Voyages</Link></li>
              <li><Link to="/destinations" className="hover:text-sahara-gold transition-colors">Destinations</Link></li>
              <li><Link to="/about" className="hover:text-sahara-gold transition-colors">À Propos</Link></li>
              <li><Link to="/contact" className="hover:text-sahara-gold transition-colors">Contact</Link></li>
              <li><Link to="/planner" className="hover:text-sahara-gold transition-colors">Planificateur de Voyage</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-sahara-gold shrink-0" />
                <span>123 Avenue des Dunes, Merzouga, Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-sahara-gold shrink-0" />
                <span>+212 5 24 44 55 66</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-sahara-gold shrink-0" />
                <span>contact@sahara-voyages.ma</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Inscrivez-vous pour recevoir nos offres exclusives et récits de voyage.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sahara-gold flex-1"
              />
              <button className="bg-sahara-gold text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-sahara-orange transition-colors">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <p>© 2026 Agence de Voyage Sahara. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/legal" className="hover:text-white transition-colors">Mentions Légales</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link to="/terms" className="hover:text-white transition-colors">CGV</Link>
          </div>
          <div className="flex gap-4 grayscale opacity-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};
