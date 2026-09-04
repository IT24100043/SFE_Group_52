import { Sparkles } from 'lucide-react';
import { generateSmartTips } from '../lib/taskUtils';

export default function SmartTip({ tasks }) {
  const tips = generateSmartTips(tasks);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={18} />
        <h3 className="font-display font-semibold">Smart Study Tips</h3>
      </div>
      <div className="space-y-2.5">
        {tips.map((tip, i) => (
          <p key={i} className="text-sm leading-relaxed text-white/90 flex gap-2">
            <span>{tip.emoji}</span>
            <span>{tip.text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
