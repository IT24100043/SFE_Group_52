import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  GraduationCap,
  LayoutDashboard,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';

const previewTasks = [
  { topic: 'Software Engineering Assignment', priority: 'High', due: 'Due in 2 days', done: false },
  { topic: 'Database ER Diagram', priority: 'Medium', due: 'Due in 5 days', done: false },
  { topic: 'AI Presentation', priority: 'High', due: 'Due tomorrow', done: false },
  { topic: 'Web Development Project', priority: 'Low', due: 'Completed', done: true },
];

const priorityDot = { High: 'bg-rose-accent', Medium: 'bg-amber-accent', Low: 'bg-teal-accent' };

const problems = [
  { emoji: '📚', title: 'Too many assignments', text: 'Coursework, labs and projects scattered across notebooks, chats and apps.' },
  { emoji: '⏰', title: 'Missed deadlines', text: "It's easy to lose track of what's due next when everything lives in different places." },
  { emoji: '📊', title: 'No clear progress', text: "No simple way to see how much of the semester's workload is actually done." },
];

const features = [
  { icon: LayoutDashboard, title: 'Smart Task Management', text: 'Organize coursework, assignments and projects in one clean workspace.' },
  { icon: CalendarClock, title: 'Deadline Focus', text: 'Instantly know what needs your attention next.' },
  { icon: Target, title: 'Priority Control', text: 'Focus on what matters most with High, Medium and Low priorities.' },
  { icon: TrendingUp, title: 'Progress Tracking', text: 'See your academic progress visually as you complete tasks.' },
  { icon: Search, title: 'Quick Search', text: 'Find any task instantly by topic or description.' },
  { icon: GraduationCap, title: 'Built for Students', text: 'Designed around real Sri Lankan university workflows.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-ink-50 overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-ink-50/80 backdrop-blur-sm border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle className="w-9 h-9" />
            <Link to="/login" className="px-3 sm:px-4 py-2 text-sm font-semibold text-ink-700 hover:text-brand-600 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 sm:px-4 py-2 rounded-xl bg-brand-500 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-600 mb-6 border border-brand-200/50">
            <Sparkles size={15} /> Made for Sri Lankan university students
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-ink-900 tracking-tight">
            Study smarter. <br className="hidden sm:block" />Stay organized.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed max-w-lg font-medium">
            Your academic workspace for assignments, projects, deadlines and study goals — designed for Sri Lankan university students.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-base font-bold text-white shadow-md hover:bg-brand-600 transition-colors"
            >
              Start Studying <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-ink-300 bg-surface px-6 py-3.5 text-base font-bold text-ink-800 hover:bg-ink-100 transition-colors"
            >
              Explore Dashboard
            </Link>
          </div>
          <p className="mt-6 text-sm sm:text-base font-semibold text-ink-500">"Plan Better. Study Smarter. Achieve More."</p>
        </div>

        {/* Dashboard preview */}
        <div className="relative animate-fade-in-up">
          <div className="absolute -inset-6 bg-gradient-to-br from-brand-300/30 to-teal-accent/20 rounded-[2rem] blur-2xl -z-10" />
          <div className="rounded-2xl border border-ink-200/80 bg-surface shadow-xl p-6 sm:p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-ink-500">Good morning, Nimasha 👋</p>
                <p className="font-display text-lg font-bold text-ink-900">Your Dashboard</p>
              </div>
              <div className="grid place-items-center w-10 h-10 rounded-full bg-brand-500 text-white font-extrabold text-base">N</div>
            </div>
            <div className="grid grid-cols-2 gap-3.5 mb-6">
              <div className="rounded-xl bg-brand-50 p-3.5 border border-brand-100/50">
                <p className="text-xs sm:text-sm font-bold text-ink-600">Total Tasks</p>
                <p className="font-display text-2xl font-extrabold text-ink-900">12</p>
              </div>
              <div className="rounded-xl bg-teal-accent/15 p-3.5 border border-teal-accent/30">
                <p className="text-xs sm:text-sm font-bold text-ink-600">Completed</p>
                <p className="font-display text-2xl font-extrabold text-ink-900">7</p>
              </div>
            </div>
            <div className="space-y-3">
              {previewTasks.map((t) => (
                <div key={t.topic} className="flex items-center gap-3 rounded-xl border border-ink-200/60 bg-ink-50/70 px-3.5 py-3">
                  <CheckCircle2 size={18} className={t.done ? 'text-teal-accent' : 'text-ink-400'} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm sm:text-base font-bold truncate ${t.done ? 'line-through text-ink-400' : 'text-ink-900'}`}>{t.topic}</p>
                    <p className="text-xs sm:text-sm font-medium text-ink-500">{t.due}</p>
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${priorityDot[t.priority]}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="bg-surface border-y border-ink-200/80 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 max-w-2xl mx-auto tracking-tight">
            University life moves fast. Your tasks shouldn't get lost.
          </h2>
          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-left">
            {problems.map((p) => (
              <div key={p.title} className="rounded-2xl border border-ink-200/80 bg-surface p-6 hover:shadow-md transition-all">
                <span className="text-4xl">{p.emoji}</span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{p.title}</h3>
                <p className="mt-2 text-base text-ink-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 font-display text-xl font-bold text-brand-600">
            StudyWithMe brings everything into one place.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">Everything you need to stay ahead</h2>
          <p className="mt-3 text-lg text-ink-600 font-medium">Simple tools, built around how students actually work.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-ink-200/80 bg-surface p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600 mb-4 border border-brand-200/50">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-lg font-bold text-ink-900">{title}</h3>
              <p className="mt-2 text-base text-ink-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 px-6 sm:px-12 py-16 text-center text-white shadow-xl">
          <BookOpen size={36} className="mx-auto mb-4 opacity-90" />
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Ready to take control of your semester?</h2>
          <p className="mt-3 text-lg text-white/90 max-w-md mx-auto font-medium">Join StudyWithMe and turn your to-do list into real academic progress.</p>
          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-surface px-7 py-3.5 text-base font-bold text-brand-700 shadow-md hover:bg-brand-50 transition-colors"
          >
            Start Studying <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-ink-200/80 py-8 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm font-medium text-ink-500">Built for SE3090 — Software Engineering Frameworks Mini Hackathon.</p>
        </div>
      </footer>
    </div>
  );
}
