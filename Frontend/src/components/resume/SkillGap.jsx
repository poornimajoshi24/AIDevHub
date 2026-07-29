import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Check, Plus, AlertCircle, Sparkles } from 'lucide-react';

export const SkillGap = ({ detectedSkills = [], skillGaps = [] }) => {
  const defaultSkills = [
    'React 18 / Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js Express',
    'PostgreSQL / Prisma', 'Redis Caching', 'Docker / Containers',
    'AWS S3 / Lambda', 'RESTful & GraphQL APIs', 'Jest / Cypress E2E'
  ];

  const defaultGaps = [
    { skill: 'Kubernetes Cluster Ops', priority: 'High', demand: '88% of Staff Engineer postings' },
    { skill: 'Golang / System Programming', priority: 'Medium', demand: '64% of High Scale postings' },
    { skill: 'OpenTelemetry & Tracing', priority: 'Medium', demand: '52% of Observability postings' }
  ];

  const skillsList = detectedSkills.length > 0 ? detectedSkills : defaultSkills;
  const gapsList = skillGaps.length > 0 ? skillGaps : defaultGaps;

  return (
    <Card hoverEffect={false} className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> Market Skill Gap Matrix
        </h3>
        <span className="text-xs text-slate-400">Target Role: Senior Staff Architect</span>
      </div>

      {/* Verified Skills */}
      <div className="flex flex-col gap-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-400" /> Verified Core Competencies ({skillsList.length})
        </h4>
        <div className="flex flex-wrap gap-2">
          {skillsList.map((skill, idx) => (
            <Badge key={idx} variant="purple" size="md" icon={Check}>
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Missing High Demand Skills */}
      <div className="flex flex-col gap-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-400" /> High-Value Keywords to Add
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {gapsList.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-3.5 rounded-xl border border-white/10 flex flex-col justify-between gap-2 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{item.skill}</span>
                <Badge variant={item.priority === 'High' ? 'rose' : 'amber'} size="sm">
                  {item.priority}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400">{item.demand}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SkillGap;
