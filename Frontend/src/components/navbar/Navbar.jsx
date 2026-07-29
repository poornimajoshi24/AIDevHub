import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Dropdown } from '../ui/Dropdown';
import { 
  Sparkles, 
  FileText, 
  Github, 
  MessageSquareCode, 
  Network, 
  LayoutDashboard, 
  User, 
  LogOut, 
  Menu, 
  X,
  Search
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Resume AI', path: '/resume', icon: FileText },
    { label: 'GitHub Review', path: '/github', icon: Github },
    { label: 'AI Chat', path: '/chat', icon: MessageSquareCode },
    { label: 'Visualizer', path: '/visualizer', icon: Network },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const userDropdownItems = [
    { label: user ? user.name : 'Account', icon: User, onClick: () => navigate('/profile') },
    { label: user ? user.role : 'Senior Engineer', divider: false },
    { divider: true },
    { label: 'Log Out', icon: LogOut, danger: true, onClick: handleLogout }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-glow-purple group-hover:shadow-glow-cyan transition-all duration-300">
            <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              AIDevHub <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">v2.4</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel rounded-full px-3 py-1.5 border border-white/10">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600/30 text-white border border-purple-500/40 shadow-glow-purple'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Search & Auth Profile */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search AI metrics..."
              className="w-44 glass-input rounded-full text-xs text-slate-200 placeholder-slate-500 pl-8 pr-3 py-1.5 focus:w-60 transition-all duration-300"
            />
          </div>

          {user ? (
            <Dropdown
              align="right"
              trigger={
                <div className="flex items-center gap-2.5 p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
                  <Avatar src={user.avatar} alt={user.name} size="sm" status="online" />
                  <span className="text-xs font-semibold text-slate-200 pr-1">{user.name.split(' ')[0]}</span>
                </div>
              }
              items={userDropdownItems}
            />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="text-xs font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-glow-purple hover:opacity-90 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-xl glass-panel"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 flex flex-col gap-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-purple-600/30 text-white border border-purple-500/40'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="border-t border-white/10 pt-3 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Avatar src={user.avatar} alt={user.name} size="sm" />
                  <div>
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-rose-500/10"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2 w-full">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-medium glass-panel rounded-xl text-white"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold rounded-xl bg-purple-600 text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
