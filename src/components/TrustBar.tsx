import React from 'react';
import { motion } from 'motion/react';
import { Users, ShieldCheck, Map, Headphones } from 'lucide-react';

const stats = [
  { label: "Voyageurs", value: 2500, suffix: "+", icon: Users },
  { label: "Satisfaction", value: 98, suffix: "%", icon: ShieldCheck },
  { label: "Expérience", value: 15, suffix: " Ans", icon: Map },
  { label: "Note Moyenne", value: 4.9, suffix: "/5", icon: Headphones },
];

export const TrustBar = () => {
  return (
    <section className="bg-desert-night py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-display font-bold text-sahara-gold mb-2">
                {stat.value}{stat.suffix}
              </p>
              <p className="text-xs md:text-sm uppercase tracking-widest font-bold text-sand-300 opacity-60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold/20 to-transparent" />
    </section>
  );
};
