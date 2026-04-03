import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const phoneNumber = "212612236660";
  const message = "Bonjour ! J'aimerais avoir plus d'informations sur vos expéditions dans le Sahara.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 left-8 z-50 flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-2xl shadow-2xl hover:bg-[#128C7E] transition-all group"
      aria-label="Chatter sur WhatsApp"
    >
      <div className="relative">
        <MessageCircle size={24} fill="currentColor" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-sahara-red rounded-full border-2 border-[#25D366] animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-bold leading-none opacity-80">Chatbot</span>
        <span className="text-sm font-bold leading-none">WhatsApp</span>
      </div>
      
      {/* Tooltip for desktop */}
      <span className="absolute bottom-full left-0 mb-4 bg-desert-night text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
        Besoin d'aide ? Contactez-nous !
      </span>
    </motion.a>
  );
};
