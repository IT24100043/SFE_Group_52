export default function ProgressBar({ percent = 0, label, className = '' }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className={className}>
      {label && (
        <div className="flex items-center justify-between mb-2 text-sm sm:text-base">
          <span className="font-semibold text-ink-700">{label}</span>
          <span className="font-extrabold text-ink-900">{clamped}%</span>
        </div>
      )}
      <div className="h-3 w-full rounded-full bg-ink-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-teal-accent transition-[width] duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export function ProgressRing({ percent = 0, size = 150, stroke = 14 }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={stroke} className="text-ink-200" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progress-gradient)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-500)" />
            <stop offset="100%" stopColor="var(--color-teal-accent)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900">{clamped}%</span>
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-ink-600">Complete</span>
      </div>
    </div>
  );
}

