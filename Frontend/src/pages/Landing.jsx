import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  Sparkles, 
  FileText, 
  Github, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Activity,
  Star,
  Layers
} from 'lucide-react';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-20 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center pt-8 gap-6 relative">
        {/* Glow halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none" />

        <Badge variant="purple" size="lg" icon={Sparkles} className="animate-pulse">
          Next-Gen AI Developer & Career Intelligence Platform
        </Badge>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl"
        >
          Supercharge Your Engineering Career & <span className="text-gradient">Code Quality with AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed"
        >
          Upload your resume for real-time <span className="text-purple-300 font-medium">ATS score optimization</span> and connect your GitHub projects for deep <span className="text-cyan-300 font-medium">architectural code reviews</span>, security audits, and automated refactoring suggestions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <Button
            variant="primary"
            size="lg"
            icon={Zap}
            onClick={() => navigate('/dashboard')}
            className="shadow-glow-purple"
          >
            Launch AI Dashboard Free
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={Github}
            onClick={() => navigate('/github')}
          >
            Review GitHub Repository
          </Button>
        </motion.div>

        {/* Feature stats ticker */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-xs text-slate-400 font-mono border-t border-white/10 mt-4">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 99.4% ATS Accuracy</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 14ms AI Code Audit</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Powered by Gemini 3.6</span>
        </div>
      </section>

      {/* FEATURE CARDS DEMO MATRIX */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Resume AI */}
        <Card hoverEffect={true} glow glowColor="purple" className="flex flex-col justify-between gap-6 p-8">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">AI Resume & ATS Score Optimizer</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Instantly analyze your resume against 50,000+ tech job descriptions. Get a detailed ATS grade, missing keyword alerts, skill gap matrices, and quantifiable bullet rewrites.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                92%
              </div>
              <div>
                <p className="text-xs font-bold text-white">Greenhouse ATS Grade: A+</p>
                <p className="text-[11px] text-slate-400">9 Keywords matched, 3 Skill Gaps</p>
              </div>
            </div>
            <Link to="/resume">
              <Button variant="ghost" size="sm" icon={ArrowRight}>
                Try Resume AI
              </Button>
            </Link>
          </div>
        </Card>

        {/* Card 2: GitHub Code Audit */}
        <Card hoverEffect={true} glow glowColor="cyan" className="flex flex-col justify-between gap-6 p-8">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Github className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">GitHub AI Code Quality Auditor</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Paste any GitHub repository link. Our AI parses code structure, cyclomatic complexity, security vulnerabilities, test coverage, and generates step-by-step refactoring PR recommendations.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                94
              </div>
              <div>
                <p className="text-xs font-bold text-white">Repo: alexdev/next-engine</p>
                <p className="text-[11px] text-slate-400">0 Security Issues | High Test Coverage</p>
              </div>
            </div>
            <Link to="/github">
              <Button variant="ghost" size="sm" icon={ArrowRight}>
                Try Code Audit
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* TECH ARCHITECTURE INTERACTIVE HIGHLIGHTS */}
      <section className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 flex flex-col gap-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <Badge variant="cyan" size="md">
              Enterprise Suite Capabilities
            </Badge>
            <h2 className="text-3xl font-extrabold text-white mt-2">Built for Modern Tech Leaders</h2>
          </div>
          <Link to="/dashboard">
            <Button variant="primary" size="md" icon={ArrowRight}>
              Explore Full Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2 p-4 rounded-2xl glass-panel border border-white/5">
            <div className="p-2 w-fit rounded-xl bg-purple-500/10 text-purple-400 mb-2">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">AI Architecture Visualizer</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-generate live interactive SVG dependency graphs directly from code imports.
            </p>
          </div>

          <div className="flex flex-col gap-2 p-4 rounded-2xl glass-panel border border-white/5">
            <div className="p-2 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 mb-2">
              <Terminal className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Interactive AI Developer Mentor</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Chat in real-time with an AI model fine-tuned on system design, algorithms, and career strategy.
            </p>
          </div>

          <div className="flex flex-col gap-2 p-4 rounded-2xl glass-panel border border-white/5">
            <div className="p-2 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Zero Data Retention</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your source code and resume details are processed in secure ephemeral memory sandbox environments.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
