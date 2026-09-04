import { BookOpen, CalendarClock, GraduationCap, ShieldCheck, Sparkles, Target } from 'lucide-react';

const keyHighlights = [
  {
    icon: Target,
    title: 'Priority-Based System',
    description: 'Categorize tasks into High, Medium, and Low priorities to focus on what matters most.',
  },
  {
    icon: CalendarClock,
    title: 'Structured Due Dates',
    description: 'Stay ahead of deadlines and keep track of coursework, assignments, and exam dates.',
  },
  {
    icon: GraduationCap,
    title: 'Work-Study Balance',
    description: 'Designed specifically for students balancing academic coursework with jobs or internships.',
  },
  {
    icon: ShieldCheck,
    title: 'Exam Readiness',
    description: 'Plan exam preparation effectively without last-minute cramming or missed tasks.',
  },
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in-up pb-12">
      {/* Header */}
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-600 mb-3 border border-brand-200/50">
          <Sparkles size={16} /> Academic Productivity Platform
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          About Us
        </h1>
        <p className="mt-3 text-base sm:text-lg text-ink-600 leading-relaxed font-medium">
          Empowering Sri Lankan university students with simple, structured, and priority-driven task management.
        </p>
      </div>

      {/* Main Content Cards */}
      <div className="grid gap-6">
        {/* Paragraph 1 Card */}
        <div className="rounded-2xl border border-ink-200/80 bg-surface p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl -z-10" />
          <div className="flex items-start gap-4">
            <div className="grid place-items-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600 shrink-0">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 mb-3">
                Smart Task Management for Students
              </h2>
              <p className="text-base text-ink-700 leading-relaxed">
                StudyWithMe is a simple full-stack web application designed to help university students in Sri Lanka
                organize and manage their study tasks efficiently. It allows users to add tasks with subjects,
                priority levels, and due dates in a simple and structured way.
              </p>
            </div>
          </div>
        </div>

        {/* Paragraph 2 Card */}
        <div className="rounded-2xl border border-ink-200/80 bg-surface p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-accent/5 rounded-full blur-2xl -z-10" />
          <div className="flex items-start gap-4">
            <div className="grid place-items-center w-12 h-12 rounded-xl bg-teal-accent/10 text-teal-accent shrink-0">
              <GraduationCap size={24} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 mb-3">
                Overcoming Time Management Challenges
              </h2>
              <p className="text-base text-ink-700 leading-relaxed">
                The project addresses the common challenge of poor time management, especially for students balancing
                studies with part-time jobs or internships. By using a priority-based system, students can focus on
                important tasks and plan their exam preparation more effectively.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div>
        <h3 className="font-display text-xl font-bold text-ink-900 mb-5">
          Key Features & Benefits
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {keyHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-ink-200/80 bg-surface p-6 hover:border-brand-300 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="grid place-items-center w-10 h-10 rounded-xl bg-brand-50 text-brand-600 shrink-0">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-display font-bold text-base text-ink-900">{item.title}</h4>
                </div>
                <p className="text-sm sm:text-base text-ink-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

