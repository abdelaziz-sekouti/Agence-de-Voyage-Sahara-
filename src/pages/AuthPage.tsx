import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/Toast';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    const isAdmin = email.toLowerCase().includes('admin');
    const userData = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: isLogin ? (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)) : name,
      email,
      role: isAdmin ? 'admin' : 'user' as 'admin' | 'user',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    setUser(userData);
    toast.success(isLogin ? "Bon retour !" : "Compte créé avec succès !");
    navigate(isAdmin ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen pt-24 pb-24 flex items-center justify-center bg-sand-50 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-display font-bold mb-2">
              {isLogin ? 'Bon retour !' : 'Créer un compte'}
            </h1>
            <p className="text-gray-500">
              {isLogin ? 'Connectez-vous pour gérer vos voyages' : 'Rejoignez l\'aventure Sahara Travel'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-sand-50 border border-sand-100 rounded-xl focus:ring-2 focus:ring-sahara-gold outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-sand-50 border border-sand-100 rounded-xl focus:ring-2 focus:ring-sahara-gold outline-none transition-all"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-sand-50 border border-sand-100 rounded-xl focus:ring-2 focus:ring-sahara-gold outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
              {isLogin ? 'Se connecter' : 'S\'inscrire'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-sand-100"></div>
              </div>
              <span className="relative px-4 bg-white text-xs font-bold uppercase tracking-widest text-gray-400">Ou continuer avec</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border border-sand-100 rounded-xl hover:bg-sand-50 transition-colors">
                <Chrome size={18} />
                <span className="text-sm font-bold">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-sand-100 rounded-xl hover:bg-sand-50 transition-colors">
                <Github size={18} />
                <span className="text-sm font-bold">GitHub</span>
              </button>
            </div>
          </div>

          <p className="mt-12 text-center text-sm text-gray-500">
            {isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-sahara-gold font-bold hover:underline"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
