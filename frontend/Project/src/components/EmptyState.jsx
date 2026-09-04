import { Link } from 'react-router-dom';

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionTo, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-dashed border-ink-200 bg-surface/60">
      {Icon && (
        <div className="mb-4 grid place-items-center w-14 h-14 rounded-2xl bg-brand-50 text-brand-500">
          <Icon size={26} />
        </div>
      )}
      <h3 className="font-display font-semibold text-lg text-ink-900">{title}</h3>
      {description && <p className="mt-1.5 text-sm text-ink-500 max-w-sm">{description}</p>}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
