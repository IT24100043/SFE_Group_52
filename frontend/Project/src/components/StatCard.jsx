export default function StatCard({ icon: Icon, label, value, accent = 'brand', suffix = '' }) {
  const accentMap = {
    brand: 'bg-brand-50 text-brand-600 dark:text-brand-400 border border-brand-200/50',
    teal: 'bg-teal-accent/15 text-teal-accent border border-teal-accent/30',
    amber: 'bg-amber-accent/15 text-amber-accent border border-amber-accent/30',
    rose: 'bg-rose-accent/15 text-rose-accent border border-rose-accent/30',
  };

  return (
    <div className="rounded-2xl border border-ink-200/80 bg-surface p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-ink-600">{label}</span>
        <div className={`grid place-items-center w-10 h-10 rounded-xl ${accentMap[accent]}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900">
        {value}
        {suffix}
      </p>
    </div>
  );
}

