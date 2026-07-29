import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Activity, GitCommit } from 'lucide-react';

export const ContributionChart = ({ contributions = [] }) => {
  const defaultData = [
    { day: 'Mon', count: 12 },
    { day: 'Tue', count: 18 },
    { day: 'Wed', count: 24 },
    { day: 'Thu', count: 15 },
    { day: 'Fri', count: 29 },
    { day: 'Sat', count: 8 },
    { day: 'Sun', count: 5 }
  ];

  const data = contributions.length > 0 ? contributions : defaultData;
  const maxVal = Math.max(...data.map(d => d.count), 1);

  return (
    <Card hoverEffect={false} className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Repository Commit Velocity</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
          <GitCommit className="w-3.5 h-3.5 text-purple-400" /> 112 Commits this month
        </span>
      </div>

      <div className="h-36 flex items-end justify-between gap-3 pt-4 px-2">
        {data.map((item, idx) => {
          const heightPercent = Math.round((item.count / maxVal) * 100);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-mono text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.count}
              </span>
              <div className="w-full bg-white/5 rounded-t-lg h-full max-h-28 flex items-end overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 via-purple-500 to-cyan-400 group-hover:brightness-125 transition-all"
                />
              </div>
              <span className="text-xs font-semibold text-slate-400">{item.day}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ContributionChart;
