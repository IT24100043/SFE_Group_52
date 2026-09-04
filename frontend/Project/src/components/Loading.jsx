export function Spinner({ size = 20, className = '' }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Loading({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-500">
      <Spinner size={28} className="text-brand-500" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-ink-100 bg-surface p-5 animate-pulse">
      <div className="h-3 w-20 rounded bg-ink-100 mb-4" />
      <div className="h-5 w-32 rounded bg-ink-100 mb-2" />
      <div className="h-3 w-full rounded bg-ink-100 mb-1.5" />
      <div className="h-3 w-2/3 rounded bg-ink-100" />
    </div>
  );
}

export function TaskRowSkeleton() {
  return (
    <div className="rounded-xl border border-ink-100 bg-surface p-4 animate-pulse flex items-center gap-4">
      <div className="h-4 w-4 rounded-full bg-ink-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-1/3 rounded bg-ink-100" />
        <div className="h-3 w-1/2 rounded bg-ink-100" />
      </div>
      <div className="h-5 w-16 rounded-full bg-ink-100 shrink-0" />
    </div>
  );
}
