import React from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Target, Layout, Zap, AlignLeft } from 'lucide-react';

export const ResumeScoreCard = ({ breakdown }) => {
  const metrics = [
    { label: 'Quantifiable Impact & Metrics', score: breakdown?.impact || 94, icon: Target, color: 'purple', description: 'Metrics like % latency reduction or revenue growth' },
    { label: 'ATS Format & Structure', score: breakdown?.formatting || 90, icon: Layout, color: 'cyan', description: 'Single-column structure readability by Greenhouse/Lever' },
    { label: 'Target Role Relevance', score: breakdown?.relevance || 86, icon: Zap, color: 'emerald', description: 'Keyword density alignment with Senior Tech lead roles' },
    { label: 'Brevity & Active Voice', score: breakdown?.brevity || 88, icon: AlignLeft, color: 'amber', description: 'Concise bullet points & powerful action verbs' },
  ];

  return (
    <Card hoverEffect={false} className="w-full flex flex-col gap-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          Detailed Dimension Breakdown
        </h3>
        <span className="text-xs text-slate-400 font-mono">AI Model Version 4.2</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-purple-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">{m.label}</span>
                </div>
                <span className="text-sm font-extrabold text-white font-mono">{m.score}/100</span>
              </div>
              <ProgressBar value={m.score} color={m.color} showPercentage={false} height="h-2" />
              <p className="text-[11px] text-slate-400 leading-snug">{m.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ResumeScoreCard;
