import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Plus, Search } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useToast } from '../context/ToastContext';
import TaskList from '../components/TaskList';
import ConfirmDialog from '../components/ConfirmDialog';
import { TaskRowSkeleton } from '../components/Loading';

const FILTERS = ['All', 'Pending', 'Completed', 'High Priority', 'Medium Priority', 'Low Priority'];
const SORTS = [
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'status', label: 'Status' },
];
const PRIORITY_RANK = { High: 0, Medium: 1, Low: 2 };

export default function Tasks() {
  const { tasks, loading, error, editTask, removeTask } = useTasks();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('dueDate');
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    let result = [...tasks];

    if (filter === 'Pending') result = result.filter((t) => !t.Done);
    else if (filter === 'Completed') result = result.filter((t) => t.Done);
    else if (filter === 'High Priority') result = result.filter((t) => t.Priority === 'High');
    else if (filter === 'Medium Priority') result = result.filter((t) => t.Priority === 'Medium');
    else if (filter === 'Low Priority') result = result.filter((t) => t.Priority === 'Low');

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (t) => t.Topic.toLowerCase().includes(q) || t.Description.toLowerCase().includes(q)
      );
    }

    if (sort === 'dueDate') result.sort((a, b) => new Date(a.End_Date) - new Date(b.End_Date));
    else if (sort === 'priority') result.sort((a, b) => PRIORITY_RANK[a.Priority] - PRIORITY_RANK[b.Priority]);
    else if (sort === 'status') result.sort((a, b) => Number(a.Done) - Number(b.Done));

    return result;
  }, [tasks, filter, search, sort]);

  async function handleToggleDone(task) {
    try {
      await editTask(task._id, { Done: !task.Done });
      toast.success(task.Done ? 'Task marked as pending.' : 'Nice work! Task completed.');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Something went wrong. Please try again.');
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await removeTask(pendingDelete._id);
      toast.success('Task deleted successfully.');
      setPendingDelete(null);
    } catch (err) {
      toast.error(err.friendlyMessage || 'Something went wrong. Please try again.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in-up pb-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">My Tasks</h1>
          <p className="mt-2 text-base sm:text-lg text-ink-600 font-medium">Keep your academic workload organized and under control.</p>
        </div>
        <Link
          to="/tasks/new"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-base font-bold text-white shadow-md hover:bg-brand-600 transition-colors"
        >
          <Plus size={18} /> New Task
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-accent/30 bg-rose-accent/10 px-4 py-3.5 text-base font-semibold text-rose-accent">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <div className="relative">
        <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search assignments, courses or projects..."
          className="w-full rounded-xl border border-ink-300 bg-surface pl-12 pr-4 py-3.5 text-base text-ink-900 placeholder:text-ink-400 outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-colors"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                filter === f
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-surface border border-ink-300 text-ink-700 hover:bg-ink-100 hover:text-ink-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-ink-300 bg-surface px-4 py-2.5 text-sm sm:text-base font-bold text-ink-800 outline-none focus:ring-2 focus:ring-brand-200"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              Sort: {s.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <TaskRowSkeleton key={i} />)}
        </div>
      ) : (
        <TaskList tasks={filtered} onToggleDone={handleToggleDone} onDelete={setPendingDelete} />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this task?"
        description="This action cannot be undone."
        confirmLabel="Delete Task"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
