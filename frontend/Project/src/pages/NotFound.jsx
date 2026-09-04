import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Logo from '../components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-ink-50 px-4">
      <div className="text-center max-w-sm">
        <Link to="/" className="inline-flex justify-center mb-8">
          <Logo />
        </Link>
        <div className="grid place-items-center w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 mx-auto mb-5">
          <Compass size={28} />
        </div>
        <h1 className="font-display text-3xl font-bold text-ink-900">404</h1>
        <p className="mt-2 text-ink-500">This page doesn't exist — maybe it got lost between assignments.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
