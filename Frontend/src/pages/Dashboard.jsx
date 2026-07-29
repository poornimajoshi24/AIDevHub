import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { 
  FileText, 
  Github, 
  Sparkles, 
  Activity, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  BarChart2, 
  Cpu, 
  Layers 
} from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <PageHeader
        badge={<Badge variant="purple" size="sm">Workspace Dashboard</Badge>}
        title="Developer Intelligence Command Center"
        subtitle="AI-driven insights for career advancement, ATS optimization, and code quality audits."
        action={
          <div className="flex items-center gap-3">
            <Button variant="primary" size="md" icon={FileText} onClick={() => navigate('/resume')}>
              Upload Resume
            </Button>
            <Button variant="secondary" size="md" icon={Github} onClick={() => navigate('/github')}>
              Audit Repository
            </Button>
          </div>
        }
      />

      {/* METRICS GRID SNAPSHOT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card hoverEffect={true} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">ATS Score Rating</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">92/100</span>
            <span className="text-xs text-emerald-400 font-semibold">+14% vs avg</span>
          </div>
          <ProgressBar value={92} color="emerald" showPercentage={false} height="h-1.5" />
          <p className="text-[11px] text-slate-400">Target: Senior Staff Engineer</p>
        </Card>

        <Card hoverEffect={true} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">GitHub Code Quality</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Github className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">94 Score</span>
            <span className="text-xs text-purple-300 font-semibold">Grade A+</span>
          </div>
          <ProgressBar value={94} color="purple" showPercentage={false} height="h-1.5" />
          <p className="text-[11px] text-slate-400">repo: alexdev/next-cloud-engine</p>
        </Card>

        <Card hoverEffect={true} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">AI Refactoring Tips</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">3 Fixes</span>
            <span className="text-xs text-cyan-400 font-semibold">Ready to apply</span>
          </div>
          <ProgressBar value={75} color="cyan" showPercentage={false} height="h-1.5" />
          <p className="text-[11px] text-slate-400">High impact latency optimization</p>
        </Card>

        <Card hoverEffect={true} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Market Keyword Alignment</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <BarChart2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">88% Match</span>
            <span className="text-xs text-amber-300 font-semibold">3 Missing</span>
          </div>
          <ProgressBar value={88} color="amber" showPercentage={false} height="h-1.5" />
          <p className="text-[11px] text-slate-400">Kubernetes & Golang recommended</p>
        </Card>
      </div>

      {/* DUAL MAIN CARDS: QUICK ACCESS TO RESUME & GITHUB */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Resume Box */}
        <Card hoverEffect={false} glow glowColor="purple" className="flex flex-col justify-between gap-6 p-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AI Resume Optimization</h3>
                  <p className="text-xs text-slate-400">Upload or review parsed ATS score metrics</p>
                </div>
              </div>
              <Badge variant="purple" size="sm">ATS Engine v3</Badge>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col gap-3 mt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Active File: Senior_Architect_2026.pdf</span>
                <span className="text-emerald-400 font-mono">Score: 92/100</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                9 keywords matched. Top recommendation: Quantify latency reduction metrics in Meta contract bullet.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">Last parsed: 12 minutes ago</span>
            <Link to="/resume">
              <Button variant="primary" size="sm" icon={ArrowRight}>
                Open Resume Analyzer
              </Button>
            </Link>
          </div>
        </Card>

        {/* GitHub Box */}
        <Card hoverEffect={false} glow glowColor="cyan" className="flex flex-col justify-between gap-6 p-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">GitHub Project Code Audit</h3>
                  <p className="text-xs text-slate-400">Review repo quality, security & architecture</p>
                </div>
              </div>
              <Badge variant="cyan" size="sm">AI Live Audit</Badge>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col gap-3 mt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-mono">alexdev/next-cloud-engine</span>
                <span className="text-cyan-400 font-mono">Grade A+ (94/100)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                0 Critical vulnerability alerts. Suggested refactoring: Memoize cell config in DataGrid.tsx to cut re-renders.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">Last audited: 1 hour ago</span>
            <Link to="/github">
              <Button variant="secondary" size="sm" icon={ArrowRight}>
                Open Code Reviewer
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* RECENT ACTIVITY TIMELINE */}
      <Card hoverEffect={false} className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" /> Recent AI Activity Feed
          </h3>
          <span className="text-xs text-slate-400">Real-time sync</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between p-3 rounded-xl glass-panel border border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Resume ATS score updated from 82 to 92</p>
                <p className="text-[11px] text-slate-400">Added quantifiable impact metric for Redis caching</p>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">12m ago</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl glass-panel border border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Audited repo alexdev/next-cloud-engine</p>
                <p className="text-[11px] text-slate-400">Discovered 0 security alerts & 2 performance tips</p>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">1h ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
