import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, X, ChevronRight, RefreshCw } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

const RATES: Record<string, number> = {
  'MAD': 1,
  'EUR': 0.092,
  'USD': 0.1,
  'GBP': 0.079,
  'CAD': 0.14
};

export const CurrencyConverter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency } = useStore();
  const [amount, setAmount] = useState(1000);

  const converted = amount * RATES[currency];

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-desert-night text-sahara-gold rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all border border-white/10"
      >
        {isOpen ? <X size={24} /> : <DollarSign size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            className="absolute bottom-16 left-0 w-64 bg-white rounded-3xl shadow-2xl border border-sand-100 p-6"
          >
            <h4 className="text-sm font-bold uppercase tracking-widest text-desert-night mb-4 flex items-center gap-2">
              <RefreshCw size={14} className="text-sahara-gold" /> Convertisseur
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Montant (MAD)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  className="w-full bg-sand-50 border border-sand-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sahara-gold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Devise</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(RATES).map(c => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={cn(
                        "py-1.5 rounded-lg text-[10px] font-bold transition-all border",
                        currency === c ? "bg-sahara-gold border-sahara-gold text-white" : "bg-sand-50 border-sand-200 text-gray-500 hover:border-sahara-gold"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-sand-50">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Résultat</p>
                <p className="text-2xl font-bold text-desert-night">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: currency }).format(converted)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
