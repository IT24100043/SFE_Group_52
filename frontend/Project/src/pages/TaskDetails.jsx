import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AlertCircle, Calendar, CheckCircle2, Circle, Clock, Pencil, Trash2 } from 'lucide-react';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import { useTasks } from '../context/TaskContext';
import { useToast } from '../context/ToastContext';
import { formatDate, PRIORITY_STYLES } from '../lib/taskUtils';

export default function TaskDetails() {
  const { id } = useParams();
  const { loading, getTaskById, editTask, removeTask } = useTasks();
  const toast = useToast();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);

  const task = getTaskById(id);

  if (loading) return <Loading label="Loading task..." />;

  if (!task) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Task not found"
        description="This task may have been deleted, or the link is no longer valid."
        actionLabel="Back to My Tasks"
        actionTo="/tasks"
      />
    );
  }

  const priorityStyle = PRIORITY_STYLES[task.Priority] || PRIORITY_STYLES.Low;

  async function handleToggle() {
    setToggling(true);
    try {
      await editTask(task._id, { Done: !task.Done });
      toast.success(task.Done ? 'Task marked as pending.' : 'Nice work! Task completed.');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Something went wrong. Please try again.');
    } finally {
      setToggling(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await removeTask(task._id);
      toast.success('Task deleted successfully.');
      navigate('/tasks');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Something went wrong. Please try again.');
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up pb-10">
      <Link to="/tasks" className="text-base font-bold text-ink-600 hover:text-brand-600 transition-colors">
        &larr; Back to My Tasks
      </Link>

      <div className="mt-4 rounded-2xl border border-ink-200/80 bg-surface p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <span className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full ring-1 ${priorityStyle.bg} ${priorityStyle.text} ${priorityStyle.ring}`}>
              {task.Priority} Priority
            </span>
            <h1 className={`mt-3 font-display text-2xl sm:text-3xl font-extrabold text-ink-900 ${task.Done ? 'line-through text-ink-400' : ''}`}>
              {task.Topic}
            </h1>
          </div>
          <span className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full ${task.Done ? 'bg-teal-accent/15 text-teal-accent' : 'bg-amber-accent/15 text-amber-accent'}`}>
            {task.Done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            {task.Done ? 'Completed' : 'Pending'}
          </span>
        </div>

        <p className="text-base sm:text-lg text-ink-700 leading-relaxed whitespace-pre-wrap font-normal">{task.Description}</p>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-ink-200/60 bg-ink-100/50 p-4">
            <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink-500 mb-1">
              <Calendar size={15} /> Start Date
            </p>
            <p className="text-base font-bold text-ink-900">{formatDate(task.Start_Date)}</p>
          </div>
          <div className="rounded-xl border border-ink-200/60 bg-ink-100/50 p-4">
            <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink-500 mb-1">
              <Calendar size={15} /> Due Date
            </p>
            <p className="text-base font-bold text-ink-900">{formatDate(task.End_Date)}</p>
          </div>
          <div className="rounded-xl border border-ink-200/60 bg-ink-100/50 p-4">
            <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink-500 mb-1">
              <Clock size={15} /> Created
            </p>
            <p className="text-base font-bold text-ink-900">{formatDate(task.createdAt)}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3.5">
          <button
            onClick={handleToggle}
            disabled={toggling}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-base font-bold text-white shadow-md hover:bg-brand-600 transition-colors disabled:opacity-60"
          >
            {task.Done ? <Circle size={18} /> : <CheckCircle2 size={18} />}
            {task.Done ? 'Mark Pending' : 'Mark Complete'}
          </button>
          <Link
            to={`/tasks/${task._id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl border border-ink-300 bg-surface px-5 py-3 text-base font-bold text-ink-800 hover:bg-ink-100 transition-colors"
          >
            <Pencil size={18} /> Edit
          </Link>
          <button
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-accent/30 bg-rose-accent/10 px-5 py-3 text-base font-bold text-rose-accent hover:bg-rose-accent/20 transition-colors"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this task?"
        description="This action cannot be undone."
        confirmLabel="Delete Task"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
