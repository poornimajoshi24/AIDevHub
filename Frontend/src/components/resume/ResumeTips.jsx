import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Lightbulb, AlertTriangle, CheckCircle, ArrowRight, Copy, Check } from 'lucide-react';

export const ResumeTips = ({ tips = [] }) => {
  const [copiedId, setCopiedId] = React.useState(null);

  const defaultTips = [
    {
      id: 1,
      category: 'Impact Metrics',
      type: 'critical',
      text: 'Quantify your latency reduction metric in your latest role. Instead of "Improved page load times", write "Architected Redis caching layer that reduced P99 latency by 42% for 2.4M daily active users".'
    },
    {
      id: 2,
      category: 'Action Verbs',
      type: 'warning',
      text: 'Replace passive verbs like "Responsible for managing CI/CD" with active verbs like "Spearheaded zero-downtime GitHub Actions pipeline across 18 microservices".'
    },
    {
      id: 3,
      category: 'ATS Parsing',
      type: 'suggestion',
      text: 'Your current multi-column table format in Experience section is 92% readable by Lever, but modern Greenhouse ATS prefers clean single-column headings.'
    }
  ];

  const activeTips = tips.length > 0 ? tips : defaultTips;

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const typeStyles = {
    critical: { badge: 'rose', icon: AlertTriangle, title: 'High Impact Fix' },
    warning: { badge: 'amber', icon: Lightbulb, title: 'Recommended Polish' },
    suggestion: { badge: 'cyan', icon: CheckCircle, title: 'ATS Formatting Tip' }
  };

  return (
    <Card hoverEffect={false} className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">AI Tailored Suggestions</h3>
        </div>
        <Badge variant="purple" size="sm">
          {activeTips.length} Action Items
        </Badge>
      </div>

      <div className="flex flex-col gap-3">
        {activeTips.map((tip) => {
          const config = typeStyles[tip.type] || typeStyles.warning;
          const Icon = config.icon;
          return (
            <div
              key={tip.id}
              className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start justify-between gap-4 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={config.badge} size="sm">
                      {config.title}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">{tip.category}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed mt-1">{tip.text}</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                icon={copiedId === tip.id ? Check : Copy}
                onClick={() => handleCopy(tip.id, tip.text)}
                className="shrink-0"
              >
                {copiedId === tip.id ? 'Copied' : 'Copy Suggestion'}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ResumeTips;
