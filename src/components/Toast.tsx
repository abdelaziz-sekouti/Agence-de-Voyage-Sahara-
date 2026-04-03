import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let toastCount = 0;
let addToastFn: (message: string, type: ToastType) => void;

export const toast = {
  success: (msg: string) => addToastFn?.(msg, 'success'),
  error: (msg: string) => addToastFn?.(msg, 'error'),
  info: (msg: string) => addToastFn?.(msg, 'info'),
  warning: (msg: string) => addToastFn?.(msg, 'warning'),
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (message: string, type: ToastType) => {
      const id = (++toastCount).toString();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl min-w-[300px] border",
                t.type === 'success' && "bg-white border-oasis-green text-desert-night",
                t.type === 'error' && "bg-white border-sahara-red text-desert-night",
                t.type === 'info' && "bg-white border-sky-blue text-desert-night",
                t.type === 'warning' && "bg-white border-sahara-orange text-desert-night"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg",
                t.type === 'success' && "bg-oasis-green/10 text-oasis-green",
                t.type === 'error' && "bg-sahara-red/10 text-sahara-red",
                t.type === 'info' && "bg-sky-blue/10 text-sky-blue",
                t.type === 'warning' && "bg-sahara-orange/10 text-sahara-orange"
              )}>
                {t.type === 'success' && <CheckCircle size={20} />}
                {t.type === 'error' && <AlertCircle size={20} />}
                {t.type === 'info' && <Info size={20} />}
                {t.type === 'warning' && <AlertTriangle size={20} />}
              </div>
              <p className="flex-1 font-medium text-sm">{t.message}</p>
              <button onClick={() => removeToast(t.id)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
