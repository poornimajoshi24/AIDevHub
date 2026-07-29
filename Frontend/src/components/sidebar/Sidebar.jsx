import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { 
  LayoutDashboard, 
  FileText, 
  Github, 
  MessageSquareCode, 
  Network, 
  User, 
  Zap, 
  Activity,
  ShieldCheck
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();

  const menuItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Resume AI Analyzer', path: '/resume', icon: FileText, badge: 'ATS v3' },
    { label: 'GitHub Code Audit', path: '/github', icon: Github, badge: 'AI Live' },
    { label: 'AI Developer Assistant', path: '/chat', icon: MessageSquareCode },
    { label: 'Architecture Visualizer', path: '/visualizer', icon: Network },
    { label: 'Profile & Settings', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 shrink-0 glass-panel border-r border-white/10 hidden lg:flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-6">
        {/* User Card */}
        <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3 border border-white/10 bg-white/[0.02]">
          <Avatar src={user?.avatar} alt={user?.name || 'User'} size="md" status="online" />
          <div className="flex flex-col min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{user?.name || 'Alex Developer'}</h4>
            <p className="text-[11px] text-purple-400 font-mono truncate">{user?.tier || 'Pro Architect'}</p>
          </div>
        </div>

        {/* Menu Navigation */}
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1">
            Workspace Navigation
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600/30 text-white border border-purple-500/40 shadow-glow-purple'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant="purple" size="sm">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* System Health Card */}
      <div className="glass-panel rounded-xl p-3 border border-white/10 bg-purple-950/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" /> AI Engine Online
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <p className="text-[11px] text-slate-400 leading-normal">
          Latency: <span className="font-mono text-emerald-400">14ms</span> | Model: <span className="text-purple-300">Gemini 3.6 Pro</span>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
