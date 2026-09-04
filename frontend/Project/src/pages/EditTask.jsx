import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import { useTasks } from '../context/TaskContext';
import { useToast } from '../context/ToastContext';

export default function EditTask() {
  const { id } = useParams();
  const { loading, getTaskById, editTask } = useTasks();
  const toast = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

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

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      await editTask(task._id, payload);
      toast.success('Task updated successfully.');
      navigate('/tasks');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto animate-fade-in-up">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">Edit Task</h1>
      <p className="mt-1 text-ink-500 mb-8">
        Update <span className="font-semibold text-ink-700">{task.Topic}</span>.
      </p>

      <div className="rounded-2xl border border-ink-100 bg-surface p-5 sm:p-7 shadow-sm">
        <TaskForm mode="edit" initialValues={task} onSubmit={handleSubmit} submitting={submitting} submitLabel="Save Changes" />
      </div>

      <Link to="/tasks" className="mt-4 inline-block text-sm text-ink-500 hover:text-brand-600">
        Cancel and go back
      </Link>
    </div>
  );
}
