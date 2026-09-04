// Shared helpers for working with Todo objects across pages.
// Kept framework-agnostic (no React) so it's trivially testable/reusable.

export const PRIORITIES = ['High', 'Medium', 'Low'];

export function formatDate(dateInput) {
  if (!dateInput) return '—';
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-LK', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function daysUntil(dateInput) {
  const d = new Date(dateInput);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

// Returns one of 'overdue' | 'today' | 'soon' | 'later' based on End_Date.
export function urgencyOf(task) {
  if (task.Done) return 'done';
  const diff = daysUntil(task.End_Date);
  if (diff < 0) return 'overdue';
  if (diff === 0) return 'today';
  if (diff <= 3) return 'soon';
  return 'later';
}

export const URGENCY_STYLES = {
  overdue: { label: 'Overdue', dot: 'bg-rose-accent', text: 'text-rose-accent font-semibold', bg: 'bg-rose-accent/15' },
  today: { label: 'Due today', dot: 'bg-rose-accent', text: 'text-rose-accent font-semibold', bg: 'bg-rose-accent/15' },
  soon: { label: 'Due soon', dot: 'bg-amber-accent', text: 'text-amber-accent font-semibold', bg: 'bg-amber-accent/15' },
  later: { label: 'Upcoming', dot: 'bg-teal-accent', text: 'text-teal-accent font-semibold', bg: 'bg-teal-accent/15' },
  done: { label: 'Completed', dot: 'bg-ink-400', text: 'text-ink-500 font-medium', bg: 'bg-ink-100' },
};

export const PRIORITY_STYLES = {
  High: { text: 'text-rose-accent', bg: 'bg-rose-accent/15', ring: 'ring-rose-accent/30', dot: 'bg-rose-accent' },
  Medium: { text: 'text-amber-accent', bg: 'bg-amber-accent/15', ring: 'ring-amber-accent/30', dot: 'bg-amber-accent' },
  Low: { text: 'text-teal-accent', bg: 'bg-teal-accent/15', ring: 'ring-teal-accent/30', dot: 'bg-teal-accent' },
};

export function computeStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.Done).length;
  const pending = total - completed;
  const high = tasks.filter((t) => t.Priority === 'High').length;
  const medium = tasks.filter((t) => t.Priority === 'Medium').length;
  const low = tasks.filter((t) => t.Priority === 'Low').length;
  const dueThisWeek = tasks.filter((t) => !t.Done && daysUntil(t.End_Date) >= 0 && daysUntil(t.End_Date) <= 7).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, pending, high, medium, low, dueThisWeek, percent };
}

export function upcomingDeadlines(tasks, limit = 4) {
  return [...tasks]
    .filter((t) => !t.Done)
    .sort((a, b) => new Date(a.End_Date) - new Date(b.End_Date))
    .slice(0, limit);
}

export function generateSmartTips(tasks) {
  const tips = [];
  if (tasks.length === 0) {
    return [{ emoji: '✨', text: 'Your workspace is clear. Add your next study goal.' }];
  }

  const stats = computeStats(tasks);
  const pendingHigh = tasks.filter((t) => t.Priority === 'High' && !t.Done);
  const dueSoon = tasks.filter((t) => !t.Done && daysUntil(t.End_Date) >= 0 && daysUntil(t.End_Date) <= 2);
  const overdue = tasks.filter((t) => !t.Done && daysUntil(t.End_Date) < 0);

  if (overdue.length > 0) {
    tips.push({
      emoji: '🚨',
      text: `You have ${overdue.length} overdue task${overdue.length > 1 ? 's' : ''}. Tackle ${overdue.length > 1 ? 'these' : 'this'} first to get back on track.`,
    });
  }

  if (pendingHigh.length >= 2) {
    tips.push({
      emoji: '🔥',
      text: `You have ${pendingHigh.length} high-priority tasks pending. Consider completing the nearest deadline first.`,
    });
  }

  if (dueSoon.length > 0) {
    tips.push({
      emoji: '⏰',
      text: `You have a deadline approaching within 2 days. Schedule a focused study session today.`,
    });
  }

  if (stats.total > 0 && stats.percent >= 70) {
    tips.push({ emoji: '🎉', text: 'Great progress! Keep your momentum going.' });
  }

  if (tips.length === 0) {
    tips.push({ emoji: '🌱', text: "You're on track. Keep chipping away at your task list." });
  }

  return tips;
}
