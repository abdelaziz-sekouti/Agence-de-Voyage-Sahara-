import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastProvider } from './components/Toast';
import { Home } from './pages/Home';
import { Tours } from './pages/Tours';
import { TourDetail } from './pages/TourDetail';
import { Destinations } from './pages/Destinations';
import { Booking } from './pages/Booking';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { DestinationDetail } from './pages/DestinationDetail';
import { Planner } from './pages/Planner';
import { CurrencyConverter } from './components/CurrencyConverter';
import { ScrollToTop } from './components/ScrollToTop';
import { SocialSidebar } from './components/SocialSidebar';

import { AuthPage } from './pages/AuthPage';

export default function App() {
  const location = useLocation();

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <SocialSidebar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tour/:id" element={<TourDetail />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destination/:id" element={<DestinationDetail />} />
                <Route path="/booking/:tourId" element={<Booking />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="*" element={<div className="pt-40 text-center h-screen">404 - Page non trouvée</div>} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <CurrencyConverter />
        <ScrollToTop />
      </div>
    </ToastProvider>
  );
}
