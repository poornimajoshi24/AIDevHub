import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignupForm } from '../components/forms/SignupForm';
import { Card } from '../components/ui/Card';
import { Sparkles } from 'lucide-react';

export const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card hoverEffect={false} glow glowColor="cyan" className="p-8 flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-1 shadow-glow-cyan">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Create Free AI Account</h2>
            <p className="text-xs text-slate-400">Unlock AI Resume Optimization & Automated GitHub Code Audits</p>
          </div>

          <SignupForm onSwitchToLogin={() => navigate('/login')} />
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
