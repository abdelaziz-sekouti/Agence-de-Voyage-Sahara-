import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, ChevronLeft, CreditCard, User, MapPin, Calendar, Plus, Minus, Star, ShieldCheck } from 'lucide-react';
import { TOURS } from '../data';
import { formatPrice, cn, generateId } from '../lib/utils';
import { useStore } from '../store';
import { toast } from '../components/Toast';

export const Booking = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const tour = TOURS.find(t => t.id === tourId);
  const { addBooking, user } = useStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: tour?.availability[0]?.date || '',
    adults: 2,
    children: 0,
    groupType: 'Couple',
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    nationality: '',
    specialRequirements: '',
    emergencyContact: '',
    extras: [] as { name: string; price: number }[],
    promoCode: '',
    paymentMethod: 'carte'
  });

  if (!tour) return <div>Tour non trouvé</div>;

  const extrasOptions = [
    { name: "Transfert aéroport", price: 500 },
    { name: "Tente privée", price: 300 },
    { name: "Photographe professionnel", price: 2000 },
    { name: "Repas spéciaux végétariens", price: 0 }
  ];

  const subtotal = (formData.adults + formData.children) * tour.price.perPerson;
  const extrasTotal = formData.extras.reduce((acc, curr) => acc + curr.price, 0);
  const discount = formData.promoCode === 'SAHARA2024' ? (subtotal + extrasTotal) * 0.1 : 0;
  const total = subtotal + extrasTotal - discount;

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleBooking = () => {
    const booking = {
      id: generateId(),
      tourId: tour.id,
      userId: user?.id || 'guest',
      date: formData.date,
      travelers: { adults: formData.adults, children: formData.children },
      groupType: formData.groupType,
      personalInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        specialRequirements: formData.specialRequirements,
        emergencyContact: formData.emergencyContact
      },
      extras: formData.extras,
      totalPrice: total,
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
      reference: `SB-${Math.floor(100000 + Math.random() * 900000)}`
    };
    addBooking(booking);
    toast.success("Réservation confirmée !");
    setStep(5);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-sand-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-sand-200 -translate-y-1/2 z-0" />
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={cn(
              "relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500",
              step >= s ? "bg-sahara-gold text-white shadow-lg shadow-sahara-gold/20" : "bg-white text-gray-400 border border-sand-200"
            )}>
              {step > s ? <Check size={20} /> : s}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <h2 className="text-3xl font-display font-bold">Date & Voyageurs</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Date de départ</label>
                      <select 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full p-4 bg-white rounded-2xl border border-sand-200 focus:outline-none focus:border-sahara-gold"
                      >
                        {tour.availability.map(a => (
                          <option key={a.date} value={a.date}>{a.date} ({a.spotsLeft} places)</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Type de groupe</label>
                      <select 
                        value={formData.groupType}
                        onChange={(e) => setFormData({...formData, groupType: e.target.value})}
                        className="w-full p-4 bg-white rounded-2xl border border-sand-200 focus:outline-none focus:border-sahara-gold"
                      >
                        {['Couple', 'Famille', 'Amis', 'Solo', 'Professionnel'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="p-6 bg-white rounded-3xl border border-sand-200 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">Adultes</p>
                        <p className="text-xs text-gray-400">12 ans et plus</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setFormData({...formData, adults: Math.max(1, formData.adults - 1)})} className="p-2 rounded-lg bg-sand-50 hover:bg-sand-100"><Minus size={16} /></button>
                        <span className="font-bold w-4 text-center">{formData.adults}</span>
                        <button onClick={() => setFormData({...formData, adults: formData.adults + 1})} className="p-2 rounded-lg bg-sand-50 hover:bg-sand-100"><Plus size={16} /></button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">Enfants</p>
                        <p className="text-xs text-gray-400">Moins de 12 ans</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})} className="p-2 rounded-lg bg-sand-50 hover:bg-sand-100"><Minus size={16} /></button>
                        <span className="font-bold w-4 text-center">{formData.children}</span>
                        <button onClick={() => setFormData({...formData, children: formData.children + 1})} className="p-2 rounded-lg bg-sand-50 hover:bg-sand-100"><Plus size={16} /></button>
                      </div>
                    </div>
                  </div>
                  <button onClick={nextStep} className="w-full btn-primary py-4">Continuer</button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <h2 className="text-3xl font-display font-bold">Informations Personnelles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Nom complet" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full p-4 bg-white rounded-2xl border border-sand-200 focus:outline-none" />
                    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-4 bg-white rounded-2xl border border-sand-200 focus:outline-none" />
                    <input type="tel" placeholder="Téléphone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-4 bg-white rounded-2xl border border-sand-200 focus:outline-none" />
                    <input type="text" placeholder="Nationalité" value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})} className="w-full p-4 bg-white rounded-2xl border border-sand-200 focus:outline-none" />
                  </div>
                  <textarea placeholder="Besoins particuliers (allergies, équipement...)" value={formData.specialRequirements} onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})} className="w-full p-4 bg-white rounded-2xl border border-sand-200 focus:outline-none h-32" />
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 btn-outline py-4">Retour</button>
                    <button onClick={nextStep} className="flex-1 btn-primary py-4">Continuer</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <h2 className="text-3xl font-display font-bold">Options & Extras</h2>
                  <div className="space-y-4">
                    {extrasOptions.map(opt => (
                      <label key={opt.name} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-sand-200 cursor-pointer hover:border-sahara-gold transition-all">
                        <div className="flex items-center gap-4">
                          <input 
                            type="checkbox" 
                            checked={formData.extras.some(e => e.name === opt.name)}
                            onChange={(e) => {
                              if (e.target.checked) setFormData({...formData, extras: [...formData.extras, opt]});
                              else setFormData({...formData, extras: formData.extras.filter(ex => ex.name !== opt.name)});
                            }}
                            className="w-5 h-5 accent-sahara-gold"
                          />
                          <span className="font-bold">{opt.name}</span>
                        </div>
                        <span className="text-sahara-gold font-bold">+{opt.price} MAD</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 btn-outline py-4">Retour</button>
                    <button onClick={nextStep} className="flex-1 btn-primary py-4">Continuer</button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <h2 className="text-3xl font-display font-bold">Paiement & Confirmation</h2>
                  <div className="p-8 bg-white rounded-3xl border border-sand-200 space-y-6">
                    <div className="flex gap-4">
                      <button onClick={() => setFormData({...formData, paymentMethod: 'carte'})} className={cn("flex-1 p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all", formData.paymentMethod === 'carte' ? "border-sahara-gold bg-sahara-gold/5 text-sahara-gold" : "border-sand-200 text-gray-400")}>
                        <CreditCard size={24} />
                        <span className="text-xs font-bold uppercase">Carte</span>
                      </button>
                      <button onClick={() => setFormData({...formData, paymentMethod: 'virement'})} className={cn("flex-1 p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all", formData.paymentMethod === 'virement' ? "border-sahara-gold bg-sahara-gold/5 text-sahara-gold" : "border-sand-200 text-gray-400")}>
                        <ShieldCheck size={24} />
                        <span className="text-xs font-bold uppercase">Virement</span>
                      </button>
                    </div>
                    {formData.paymentMethod === 'carte' && (
                      <div className="space-y-4">
                        <input type="text" placeholder="Numéro de carte" className="w-full p-4 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="MM/YY" className="w-full p-4 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none" />
                          <input type="text" placeholder="CVV" className="w-full p-4 bg-sand-50 rounded-xl border border-sand-200 focus:outline-none" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 btn-outline py-4">Retour</button>
                    <button onClick={handleBooking} className="flex-1 btn-primary py-4">Confirmer & Payer</button>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-8">
                  <div className="w-24 h-24 bg-oasis-green text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-oasis-green/20">
                    <Check size={48} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-display font-bold mb-4">Voyage Confirmé !</h2>
                    <p className="text-gray-500">Votre réservation a été enregistrée avec succès. Un email de confirmation vous a été envoyé.</p>
                  </div>
                  <div className="p-8 bg-white rounded-3xl border border-sand-200 max-w-sm mx-auto">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Référence</p>
                    <p className="text-2xl font-bold text-desert-night">SB-842931</p>
                  </div>
                  <div className="flex flex-col gap-4 max-w-sm mx-auto">
                    <button onClick={() => navigate('/dashboard')} className="btn-primary py-4">Aller au tableau de bord</button>
                    <button onClick={() => navigate('/')} className="btn-outline py-4">Retour à l'accueil</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          {step < 5 && (
            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-white rounded-3xl p-8 shadow-2xl border border-sand-100">
                <h3 className="text-xl font-display font-bold mb-6">Récapitulatif</h3>
                <div className="flex gap-4 mb-6">
                  <img src={tour.gallery[0]} className="w-20 h-20 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-sm leading-tight mb-1">{tour.title}</p>
                    <p className="text-xs text-gray-400">{tour.duration.days} jours</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm border-t border-sand-50 pt-6 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{formData.adults + formData.children} Voyageurs</span>
                    <span className="font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  {formData.extras.map(e => (
                    <div key={e.name} className="flex justify-between">
                      <span className="text-gray-500">{e.name}</span>
                      <span className="font-bold">+{e.price} MAD</span>
                    </div>
                  ))}
                  {discount > 0 && (
                    <div className="flex justify-between text-oasis-green">
                      <span>Remise (10%)</span>
                      <span className="font-bold">-{formatPrice(discount)}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-end border-t border-sand-50 pt-6">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-bold text-sahara-gold">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
