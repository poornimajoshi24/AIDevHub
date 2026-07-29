import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Github, Star, GitFork, ArrowRight, Code } from 'lucide-react';

export const RepoList = ({ onSelectRepo }) => {
  const popularRepos = [
    {
      name: 'alexdev/next-cloud-engine',
      url: 'https://github.com/alexdev/next-cloud-engine',
      stars: '1.2k',
      lang: 'TypeScript',
      quality: 94,
      updated: '2 hours ago'
    },
    {
      name: 'meta/react-server-actions-v2',
      url: 'https://github.com/meta/react-server-actions-v2',
      stars: '4.8k',
      lang: 'JavaScript',
      quality: 91,
      updated: 'Yesterday'
    },
    {
      name: 'vercel/hyper-cache-kv',
      url: 'https://github.com/vercel/hyper-cache-kv',
      stars: '890',
      lang: 'Rust / Go',
      quality: 97,
      updated: '3 days ago'
    }
  ];

  return (
    <Card hoverEffect={false} className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Github className="w-4 h-4 text-purple-400" /> Recent AI Code Audits
        </h3>
        <span className="text-xs text-slate-400">Select to view detailed analysis</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {popularRepos.map((repo, idx) => (
          <div
            key={idx}
            onClick={() => onSelectRepo?.(repo.url)}
            className="glass-panel p-3.5 rounded-xl border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.03] transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <Code className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white font-mono group-hover:text-purple-300 transition-colors">
                  {repo.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Updated {repo.updated}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="purple" size="sm">
                Score: {repo.quality}
              </Badge>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RepoList;
