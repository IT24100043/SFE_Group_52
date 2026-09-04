import { Link } from 'react-router-dom';
import { AlertCircle, CalendarClock, CheckCircle2, Flame, ListChecks, PlusCircle, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import SmartTip from '../components/SmartTip';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { CardSkeleton, TaskRowSkeleton } from '../components/Loading';
import { computeStats, upcomingDeadlines } from '../lib/taskUtils';
import { useToast } from '../context/ToastContext';

const QUOTES = [
  'Small progress every day adds up to big results.',
  "Discipline is choosing between what you want now and what you want most.",
  'A little progress each day adds up to big results.',
];

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks, loading, error, editTask } = useTasks();
  const toast = useToast();

  const stats = computeStats(tasks);
  const deadlines = upcomingDeadlines(tasks, 4);
  const quote = QUOTES[new Date().getDate() % QUOTES.length];

  async function handleToggleDone(task) {
    try {
      await editTask(task._id, { Done: !task.Done });
      toast.success(task.Done ? 'Task marked as pending.' : 'Nice work! Task completed.');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          Good {timeOfDay()}, {user?.username} 👋
        </h1>
        <p className="mt-2 text-base sm:text-lg text-ink-600 font-medium">Ready to make progress today?</p>
        <p className="mt-2 text-sm sm:text-base text-brand-600 font-semibold italic">"{quote}"</p>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-accent/30 bg-rose-accent/10 px-4 py-3.5 text-base font-semibold text-rose-accent">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <StatCard icon={ListChecks} label="Total Tasks" value={stats.total} accent="brand" />
          <StatCard icon={CalendarClock} label="Pending" value={stats.pending} accent="amber" />
          <StatCard icon={CheckCircle2} label="Completed" value={stats.completed} accent="teal" />
          <StatCard icon={Flame} label="High Priority" value={stats.high} accent="rose" />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <div className="rounded-2xl border border-ink-200/80 bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <TrendingUp size={20} className="text-brand-500" />
              <h2 className="font-display font-bold text-xl text-ink-900">Academic Progress</h2>
            </div>
            <ProgressBar percent={stats.percent} />
            <p className="mt-3 text-sm sm:text-base font-semibold text-ink-700">
              {stats.completed} / {stats.total} Task{stats.total === 1 ? '' : 's'} Completed ({stats.percent}%)
            </p>
          </div>

          <div className="rounded-2xl border border-ink-200/80 bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-xl text-ink-900">Upcoming Deadlines</h2>
              <Link to="/tasks" className="text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors">
                View all &rarr;
              </Link>
            </div>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => <TaskRowSkeleton key={i} />)}
              </div>
            ) : deadlines.length === 0 ? (
              <EmptyState
                icon={CheckCircle2}
                title="Nothing due soon"
                description="You're all caught up. Add a new task to keep planning ahead."
                actionLabel="+ New Task"
                actionTo="/tasks/new"
              />
            ) : (
              <div className="space-y-3.5">
                {deadlines.map((task) => (
                  <TaskCard key={task._id} task={task} onToggleDone={handleToggleDone} compact />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <SmartTip tasks={tasks} />

          <div className="rounded-2xl border border-ink-200/80 bg-surface p-6 shadow-sm">
            <h2 className="font-display font-bold text-xl text-ink-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/tasks/new"
                className="flex items-center gap-3 rounded-xl bg-brand-500 px-4 py-3 text-base font-bold text-white shadow-md hover:bg-brand-600 transition-colors"
              >
                <PlusCircle size={18} /> Add New Task
              </Link>
              <Link
                to="/tasks"
                className="flex items-center gap-3 rounded-xl border border-ink-300 bg-surface px-4 py-3 text-base font-bold text-ink-800 hover:bg-ink-100 transition-colors"
              >
                <ListChecks size={18} /> View All Tasks
              </Link>
              <Link
                to="/progress"
                className="flex items-center gap-3 rounded-xl border border-ink-300 bg-surface px-4 py-3 text-base font-bold text-ink-800 hover:bg-ink-100 transition-colors"
              >
                <TrendingUp size={18} /> View Progress
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function timeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

