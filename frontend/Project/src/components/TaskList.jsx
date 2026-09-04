import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Eye, ListTodo, Pencil, Trash2 } from 'lucide-react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import { formatDate, PRIORITY_STYLES, urgencyOf, URGENCY_STYLES } from '../lib/taskUtils';

export default function TaskList({ tasks, onToggleDone, onDelete, emptyActionTo = '/tasks/new' }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ListTodo}
        title="No tasks found"
        description="Try adjusting your search or filters, or add a new task to get started."
        actionLabel="+ New Task"
        actionTo={emptyActionTo}
      />
    );
  }

  return (
    <>
      {/* Mobile: cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onToggleDone={onToggleDone} onDelete={onDelete} />
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-ink-100 bg-surface shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
              <th className="px-5 py-3 w-10"></th>
              <th className="px-3 py-3">Topic</th>
              <th className="px-3 py-3">Due Date</th>
              <th className="px-3 py-3">Priority</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3 text-right pr-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const priorityStyle = PRIORITY_STYLES[task.Priority] || PRIORITY_STYLES.Low;
              const urgency = urgencyOf(task);
              const urgencyStyle = URGENCY_STYLES[urgency];
              return (
                <tr key={task._id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => onToggleDone?.(task)}
                      className="text-brand-500 hover:scale-110 transition-transform"
                      aria-label={task.Done ? 'Mark as pending' : 'Mark as completed'}
                    >
                      {task.Done ? <CheckCircle2 size={19} /> : <Circle size={19} className="text-ink-300" />}
                    </button>
                  </td>
                  <td className="px-3 py-3.5 max-w-xs">
                    <p className={`font-medium text-ink-900 truncate ${task.Done ? 'line-through text-ink-400' : ''}`}>{task.Topic}</p>
                    <p className="text-xs text-ink-500 truncate">{task.Description}</p>
                  </td>
                  <td className="px-3 py-3.5 whitespace-nowrap">
                    <span className={`text-xs font-medium ${urgencyStyle.text}`}>{formatDate(task.End_Date)}</span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ring-1 ${priorityStyle.bg} ${priorityStyle.text} ${priorityStyle.ring}`}>
                      {task.Priority}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${urgencyStyle.bg} ${urgencyStyle.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${urgencyStyle.dot}`} />
                      {task.Done ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center justify-end gap-1 pr-2">
                      <Link to={`/tasks/${task._id}`} className="p-1.5 rounded-lg text-ink-500 hover:bg-ink-100 hover:text-brand-600 transition-colors" aria-label="View task">
                        <Eye size={15} />
                      </Link>
                      <Link to={`/tasks/${task._id}/edit`} className="p-1.5 rounded-lg text-ink-500 hover:bg-ink-100 hover:text-brand-600 transition-colors" aria-label="Edit task">
                        <Pencil size={15} />
                      </Link>
                      <button onClick={() => onDelete?.(task)} className="p-1.5 rounded-lg text-ink-500 hover:bg-rose-accent/10 hover:text-rose-accent transition-colors" aria-label="Delete task">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
