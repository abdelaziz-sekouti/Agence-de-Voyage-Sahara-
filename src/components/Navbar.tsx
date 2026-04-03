import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Heart, User, Globe, Moon, Sun, ChevronDown } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

import { SearchModal } from './SearchModal';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, favorites, theme, toggleTheme, logout } = useStore();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Voyages', path: '/tours' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
      isScrolled || !isHome ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span className={cn(
            "text-2xl font-display font-bold tracking-tighter",
            isScrolled || !isHome ? "text-desert-night" : "text-white"
          )}>SAHARA</span>
          <span className={cn(
            "text-[10px] uppercase tracking-[0.3em] font-semibold -mt-1",
            isScrolled || !isHome ? "text-sahara-gold" : "text-sand-300"
          )}>Voyages & Expéditions</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors relative group",
                isScrolled || !isHome ? "text-desert-night hover:text-sahara-gold" : "text-white/90 hover:text-white",
                location.pathname === link.path && "text-sahara-gold"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 bg-sahara-gold transition-all duration-300 group-hover:w-full",
                location.pathname === link.path && "w-full"
              )} />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className={cn(
              "p-2 rounded-full transition-colors",
              isScrolled || !isHome ? "text-desert-night hover:bg-sand-100" : "text-white hover:bg-white/10"
            )}
          >
            <Search size={20} />
          </button>

          <Link to="/favorites" className={cn(
            "p-2 rounded-full transition-colors relative",
            isScrolled || !isHome ? "text-desert-night hover:bg-sand-100" : "text-white hover:bg-white/10"
          )}>
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className="absolute top-0 right-0 bg-sahara-red text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className={cn(
                "flex items-center gap-2 p-1.5 pl-3 rounded-full border transition-all",
                isScrolled || !isHome 
                  ? "border-sand-200 text-desert-night hover:bg-sand-100" 
                  : "border-white/20 text-white hover:bg-white/10"
              )}
            >
              <User size={18} />
              <ChevronDown size={14} className={cn("transition-transform", isUserDropdownOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-sand-100 overflow-hidden py-2"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-bottom border-sand-50">
                        <p className="text-xs text-gray-500">Connecté en tant que</p>
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                      </div>
                      <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-sand-50 transition-colors">Tableau de bord</Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-sand-50 transition-colors text-sahara-gold font-medium">Administration</Link>
                      )}
                      <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-sahara-red hover:bg-sand-50 transition-colors">Déconnexion</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-sm hover:bg-sand-50 transition-colors">Connexion</Link>
                      <Link to="/register" className="block px-4 py-2 text-sm hover:bg-sand-50 transition-colors">Inscription</Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full transition-colors",
              isScrolled || !isHome ? "text-desert-night hover:bg-sand-100" : "text-white hover:bg-white/10"
            )}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "lg:hidden p-2 rounded-full transition-colors",
              isScrolled || !isHome ? "text-desert-night hover:bg-sand-100" : "text-white hover:bg-white/10"
            )}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-desert-night z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-white text-2xl font-display font-bold">SAHARA</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-display text-white hover:text-sahara-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};
