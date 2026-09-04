import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`grid place-items-center rounded-xl border border-ink-200 text-ink-500 hover:bg-ink-50 hover:text-ink-900 transition-colors ${className}`}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
