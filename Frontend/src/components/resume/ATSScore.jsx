import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const ATSScore = ({ scoreData }) => {
  const score = scoreData?.score || 92;
  const grade = scoreData?.grade || 'A+';
  const status = scoreData?.status || 'Highly Optimized';

  // SVG Gauge math
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background glow */}
      <div className="absolute w-40 h-40 rounded-full bg-purple-500/15 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
          ATS Compatibility Engine Score
        </span>
      </div>

      {/* Circular Gauge */}
      <div className="relative w-44 h-44 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90">
          {/* Track */}
          <circle
            cx="88"
            cy="88"
            r={radius}
            className="text-white/5 stroke-current"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Score ring */}
          <motion.circle
            cx="88"
            cy="88"
            r={radius}
            className="text-purple-500 stroke-current drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            strokeWidth="10"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-white tracking-tighter font-mono">
            {score}
          </span>
          <span className="text-[11px] text-purple-300 font-semibold font-mono">out of 100</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Badge variant="emerald" size="lg" icon={CheckCircle}>
          Grade: {grade} — {status}
        </Badge>
      </div>

      <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-xs">
        Your resume successfully matches 92% of ATS algorithms (Greenhouse, Lever, Workday) for Senior Staff software roles.
      </p>
    </div>
  );
};

export default ATSScore;
