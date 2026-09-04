import { AlertCircle, CheckCircle2, Clock, Flame } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { ProgressRing } from '../components/ProgressBar';
import StatCard from '../components/StatCard';
import SmartTip from '../components/SmartTip';
import Loading from '../components/Loading';
import { computeStats, PRIORITY_STYLES } from '../lib/taskUtils';

export default function ProgressPage() {
  const { tasks, loading, error } = useTasks();
  const stats = computeStats(tasks);

  const priorityRows = [
    { label: 'High', count: stats.high },
    { label: 'Medium', count: stats.medium },
    { label: 'Low', count: stats.low },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">Your Progress</h1>
        <p className="mt-2 text-base sm:text-lg text-ink-600 font-medium">Every completed task is one step closer to your goal.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-accent/30 bg-rose-accent/10 px-4 py-3.5 text-base font-semibold text-rose-accent">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {loading ? (
        <Loading label="Crunching your numbers..." />
      ) : (
        <>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="rounded-2xl border border-ink-200/80 bg-surface p-6 shadow-sm flex flex-col items-center justify-center">
              <h2 className="font-display font-bold text-xl text-ink-900 mb-6 self-start">Progress Overview</h2>
              <ProgressRing percent={stats.percent} />
              <p className="mt-6 text-base font-bold text-ink-800">
                {stats.completed} / {stats.total} Tasks Completed
              </p>
            </div>

            <div className="rounded-2xl border border-ink-200/80 bg-surface p-6 shadow-sm">
              <h2 className="font-display font-bold text-xl text-ink-900 mb-6">Task Status</h2>
              <div className="space-y-5">
                <StatusRow icon={CheckCircle2} label="Completed" count={stats.completed} total={stats.total} color="teal" />
                <StatusRow icon={Clock} label="Pending" count={stats.pending} total={stats.total} color="amber" />
              </div>
            </div>

            <div className="rounded-2xl border border-ink-200/80 bg-surface p-6 shadow-sm">
              <h2 className="font-display font-bold text-xl text-ink-900 mb-6">Priority Breakdown</h2>
              <div className="space-y-5">
                {priorityRows.map((row) => {
                  const style = PRIORITY_STYLES[row.label];
                  const pct = stats.total === 0 ? 0 : Math.round((row.count / stats.total) * 100);
                  return (
                    <div key={row.label}>
                      <div className="flex items-center justify-between text-base mb-2">
                        <span className="flex items-center gap-2 font-bold text-ink-800">
                          <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} /> {row.label}
                        </span>
                        <span className="font-extrabold text-ink-900">{row.count}</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-ink-200 overflow-hidden">
                        <div className={`h-full rounded-full ${style.dot}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
              <StatCard icon={Flame} label="High Priority Tasks" value={stats.high} accent="rose" />
              <StatCard icon={Clock} label="Due This Week" value={stats.dueThisWeek} accent="amber" />
            </div>
            <SmartTip tasks={tasks} />
          </div>
        </>
      )}
    </div>
  );
}

function StatusRow({ icon: Icon, label, count, total, color }) {
  const pct = total === 0 ? 0 : Math.round((count / total) * 100);
  const colorMap = { teal: 'text-teal-accent bg-teal-accent', amber: 'text-amber-accent bg-amber-accent' };
  const [textColor, barColor] = colorMap[color].split(' ');
  return (
    <div>
      <div className="flex items-center justify-between text-base mb-2">
        <span className={`flex items-center gap-2 font-bold ${textColor}`}>
          <Icon size={17} /> {label}
        </span>
        <span className="font-extrabold text-ink-900">{count}</span>
      </div>
      <div className="h-3 w-full rounded-full bg-ink-200 overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

