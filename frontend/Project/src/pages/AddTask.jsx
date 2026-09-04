import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../context/TaskContext';
import { useToast } from '../context/ToastContext';

export default function AddTask() {
  const { createTask } = useTasks();
  const toast = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      await createTask(payload);
      toast.success('Task added successfully 🎉');
      navigate('/tasks');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto animate-fade-in-up">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">Plan your next win.</h1>
      <p className="mt-1 text-ink-500 mb-8">Add a new assignment, project or study goal.</p>

      <div className="rounded-2xl border border-ink-100 bg-surface p-5 sm:p-7 shadow-sm">
        <TaskForm mode="create" onSubmit={handleSubmit} submitting={submitting} submitLabel="Add Task" />
      </div>
    </div>
  );
}
