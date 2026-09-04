import { AlertTriangle, X } from 'lucide-react';
import { Spinner } from './Loading';

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in-up" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-2xl bg-surface p-6 shadow-2xl animate-fade-in-up">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-ink-300 hover:text-ink-700 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className={`mb-4 grid place-items-center w-12 h-12 rounded-xl ${danger ? 'bg-rose-accent/10 text-rose-accent' : 'bg-brand-50 text-brand-500'}`}>
          <AlertTriangle size={22} />
        </div>
        <h3 className="font-display font-semibold text-lg text-ink-900">{title}</h3>
        {description && <p className="mt-1.5 text-sm text-ink-500">{description}</p>}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50 transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60 ${
              danger ? 'bg-rose-accent hover:bg-rose-600' : 'bg-brand-500 hover:bg-brand-600'
            }`}
          >
            {loading && <Spinner size={16} />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
