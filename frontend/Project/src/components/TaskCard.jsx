import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Circle, Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDate, PRIORITY_STYLES, urgencyOf, URGENCY_STYLES } from '../lib/taskUtils';

export default function TaskCard({ task, onToggleDone, onDelete, compact = false }) {
  const priorityStyle = PRIORITY_STYLES[task.Priority] || PRIORITY_STYLES.Low;
  const urgency = urgencyOf(task);
  const urgencyStyle = URGENCY_STYLES[urgency];

  return (
    <div className="rounded-2xl border border-ink-200/80 bg-surface p-4 sm:p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-3.5">
        <button
          onClick={() => onToggleDone?.(task)}
          className="mt-0.5 shrink-0 text-brand-500 hover:scale-110 transition-transform"
          aria-label={task.Done ? 'Mark as pending' : 'Mark as completed'}
        >
          {task.Done ? <CheckCircle2 size={24} /> : <Circle size={24} className="text-ink-400" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
            <h4 className={`font-bold text-base sm:text-lg text-ink-900 truncate ${task.Done ? 'line-through text-ink-400' : ''}`}>
              {task.Topic}
            </h4>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ring-1 ${priorityStyle.bg} ${priorityStyle.text} ${priorityStyle.ring}`}>
              {task.Priority}
            </span>
          </div>

          {!compact && (
            <p className="text-sm sm:text-base text-ink-600 leading-relaxed line-clamp-2 mb-3">
              {task.Description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-ink-600 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} className="text-ink-400" /> {formatDate(task.End_Date)}
            </span>
            <span className={`flex items-center gap-1.5 ${urgencyStyle.text}`}>
              <span className={`w-2 h-2 rounded-full ${urgencyStyle.dot}`} />
              {urgencyStyle.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Link
            to={`/tasks/${task._id}`}
            className="p-2 rounded-xl text-ink-600 hover:bg-ink-100 hover:text-brand-600 transition-colors"
            aria-label="View task"
          >
            <Eye size={18} />
          </Link>
          <Link
            to={`/tasks/${task._id}/edit`}
            className="p-2 rounded-xl text-ink-600 hover:bg-ink-100 hover:text-brand-600 transition-colors"
            aria-label="Edit task"
          >
            <Pencil size={18} />
          </Link>
          <button
            onClick={() => onDelete?.(task)}
            className="p-2 rounded-xl text-ink-600 hover:bg-rose-accent/15 hover:text-rose-accent transition-colors"
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

