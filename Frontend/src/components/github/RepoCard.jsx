import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Github, Star, GitFork, ShieldCheck, CheckCircle2, ArrowUpRight, Code, AlertTriangle } from 'lucide-react';

export const RepoCard = ({ repoData }) => {
  if (!repoData) return null;

  return (
    <Card hoverEffect={false} className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-600/15 border border-purple-500/30 text-purple-400">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white font-mono">{repoData.repoName}</h3>
              <Badge variant="cyan" size="sm">{repoData.language}</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{repoData.url}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="gray" size="md" icon={Star}>
            {repoData.stars} stars
          </Badge>
          <Badge variant="gray" size="md" icon={GitFork}>
            {repoData.forks} forks
          </Badge>
          <a href={repoData.url} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" icon={ArrowUpRight}>
              Open on GitHub
            </Button>
          </a>
        </div>
      </div>

      {/* Main Score Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-slate-400">Code Quality</span>
          <span className="text-3xl font-black text-purple-400 font-mono my-1">{repoData.qualityScore}/100</span>
          <span className="text-[11px] text-emerald-400 font-medium">Grade A+</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-slate-400">Security Index</span>
          <span className="text-3xl font-black text-cyan-400 font-mono my-1">{repoData.securityScore}%</span>
          <span className="text-[11px] text-cyan-300 font-medium">0 Critical Vulnerabilities</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-slate-400">Test Coverage</span>
          <span className="text-3xl font-black text-emerald-400 font-mono my-1">{repoData.testCoverage}</span>
          <span className="text-[11px] text-emerald-300 font-medium">142 Unit & E2E Suites</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-slate-400">Maintainability</span>
          <span className="text-3xl font-black text-amber-400 font-mono my-1">{repoData.maintainability}</span>
          <span className="text-[11px] text-slate-400 font-medium">Low Tech Debt</span>
        </div>
      </div>
    </Card>
  );
};

export default RepoCard;
