import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Thermometer, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 162, 78, ${p.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://picsum.photos/seed/saharahero/1920/1080")',
          filter: 'brightness(0.6)'
        }}
      />
      
      {/* Sand Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-9xl font-display font-bold text-white mb-6 tracking-tighter leading-none">
            { "L'Âme du Sahara".split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-xl md:text-2xl text-sand-100 font-light mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Expéditions immersives au cœur des dunes dorées du Maroc. Là où le temps s'arrête et l'aventure commence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/tours" className="btn-primary flex items-center gap-2 group">
            Explorer les Voyages
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/planner" className="btn-outline border-white text-white hover:bg-white hover:text-desert-night">
            Voyage Sur Mesure
          </Link>
        </motion.div>
      </div>

      {/* Widgets */}
      <div className="absolute bottom-10 left-10 hidden lg:flex gap-6 z-10">
        <div className="glass-card px-4 py-2 rounded-2xl flex items-center gap-3 text-white">
          <Thermometer size={20} className="text-sahara-gold" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Merzouga</p>
            <p className="text-sm font-semibold">28°C Ensoleillé</p>
          </div>
        </div>
        <div className="glass-card px-4 py-2 rounded-2xl flex items-center gap-3 text-white">
          <Calendar size={20} className="text-sahara-gold" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Aujourd'hui</p>
            <p className="text-sm font-semibold">03 Avril 2026</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 z-10"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};
