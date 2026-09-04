import { Menu } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ onMenuClick }) {
  return (
    <header className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-surface/90 backdrop-blur-sm border-b border-ink-100 px-4 py-3">
      <Logo size="sm" />
      <div className="flex items-center gap-2">
        <ThemeToggle className="w-9 h-9" />
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-ink-700 hover:bg-ink-50 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}
