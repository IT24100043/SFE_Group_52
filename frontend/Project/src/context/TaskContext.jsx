import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { addTodo, deleteTodo, getAllTodos, updateTodo } from '../api/taskApi';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!user?._id) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getAllTodos(user._id);
      setTasks(data);
    } catch (err) {
      setError(err.friendlyMessage || 'Could not load your tasks.');
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function createTask(payload) {
    const created = await addTodo(user._id, payload);
    setTasks((prev) => [created, ...prev]);
    return created;
  }

  async function editTask(id, updates) {
    const updated = await updateTodo(id, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    return updated;
  }

  async function removeTask(id) {
    await deleteTodo(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }

  function getTaskById(id) {
    return tasks.find((t) => t._id === id) || null;
  }

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, refresh, createTask, editTask, removeTask, getTaskById }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
}
