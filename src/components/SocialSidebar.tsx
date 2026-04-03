import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const SocialSidebar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socials = [
    { icon: Facebook, href: "#", color: "hover:bg-blue-600", label: "Facebook" },
    { icon: Instagram, href: "#", color: "hover:bg-pink-600", label: "Instagram" },
    { icon: Twitter, href: "#", color: "hover:bg-sky-500", label: "Twitter" },
    { icon: MessageCircle, href: "https://wa.me/212612236660", color: "hover:bg-green-500", label: "WhatsApp" },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      <AnimatePresence>
        {isVisible && socials.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            target={social.href.startsWith('http') ? "_blank" : "_self"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
            className={cn(
              "w-12 h-12 bg-white/80 backdrop-blur-md border border-sand-200 rounded-2xl flex items-center justify-center text-desert-night shadow-xl transition-all group",
              social.color,
              "hover:text-white hover:scale-110 hover:border-transparent"
            )}
            aria-label={social.label}
          >
            <social.icon size={20} />
            <span className="absolute left-16 bg-desert-night text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
              {social.label}
            </span>
          </motion.a>
        ))}
      </AnimatePresence>
    </div>
  );
};
