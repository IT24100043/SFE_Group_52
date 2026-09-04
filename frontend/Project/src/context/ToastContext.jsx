import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

const ToastContext = createContext(null);
let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const push = useCallback((message, type = 'success') => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    timers.current[id] = setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  const toast = {
    success: (message) => push(message, 'success'),
    error: (message) => push(message, 'error'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[min(360px,calc(100vw-2rem))]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-toast-in flex items-start gap-2.5 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
              t.type === 'success'
                ? 'bg-surface/95 border-teal-accent/30 text-ink-900'
                : 'bg-surface/95 border-rose-accent/30 text-ink-900'
            }`}
          >
            {t.type === 'success' ? (
              <CheckCircle2 size={20} className="shrink-0 text-teal-accent mt-0.5" />
            ) : (
              <XCircle size={20} className="shrink-0 text-rose-accent mt-0.5" />
            )}
            <p className="text-sm leading-snug flex-1">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 text-ink-300 hover:text-ink-700 transition-colors"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
