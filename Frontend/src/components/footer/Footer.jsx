import React from 'react';
import { Sparkles, Github, Twitter, Shield, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full glass-panel border-t border-white/10 py-8 mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">AIDevHub AI Platform</p>
            <p className="text-[11px] text-slate-400">© 2026 AIDevHub Inc. Designed for futuristic developers.</p>
          </div>
        </div>

        {/* Center status */}
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <Shield className="w-3.5 h-3.5 text-cyan-400" /> Enterprise Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> All Systems Operational
          </span>
        </div>

        {/* Right social links */}
        <div className="flex items-center gap-4 text-slate-400">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
