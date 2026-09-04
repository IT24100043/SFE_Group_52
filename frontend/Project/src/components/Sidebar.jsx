import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListChecks, PlusCircle, TrendingUp, Info, LogOut, X } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tasks', label: 'My Tasks', icon: ListChecks },
  { to: '/tasks/new', label: 'Add Task', icon: PlusCircle },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/about', label: 'About', icon: Info },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed z-50 md:z-auto inset-y-0 left-0 w-64 bg-surface border-r border-ink-200/80 flex flex-col transition-transform duration-200 md:translate-x-0 md:sticky md:top-0 md:h-screen ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-ink-100">
          <Logo size="sm" />
          <div className="flex items-center gap-1.5">
            <ThemeToggle className="w-9 h-9" />
            <button onClick={onClose} className="md:hidden text-ink-500 hover:text-ink-900 p-1" aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/tasks'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 rounded-xl px-4 py-3 text-base font-bold transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-ink-700 hover:bg-ink-100 hover:text-ink-900'
                }`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-ink-200/80">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 mb-2 bg-ink-50/60 border border-ink-100">
            <div className="grid place-items-center w-10 h-10 rounded-full bg-brand-500 text-white font-extrabold text-base shrink-0 shadow-sm">
              {user?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-ink-900 truncate">{user?.username}</p>
              <p className="text-xs font-medium text-ink-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-base font-bold text-rose-accent hover:bg-rose-accent/15 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

