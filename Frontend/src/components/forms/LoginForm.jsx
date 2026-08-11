import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../common/ErrorMessage';
import { Mail, Lock, LogIn, Github, ArrowRight } from 'lucide-react';

export const LoginForm = ({ onSwitchToSignup }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {error && <ErrorMessage title="Authentication Error" message={error} />}

      <Input
        label="Work Email"
        type="email"
        icon={Mail}
        placeholder="name@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        icon={Lock}
        placeholder="••••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex items-center justify-between text-xs text-slate-400">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500/20" />
          <span>Remember session</span>
        </label>
        <a href="#forgot" className="text-purple-400 hover:text-purple-300 transition-colors">
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        icon={LogIn}
        loading={loading}
        className="w-full mt-2"
      >
        Sign In to Platform
      </Button>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#0e121e] px-2 text-slate-500 font-mono">Or connect with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="secondary"
        size="md"
        icon={Github}
        onClick={() => {
          setError('GitHub OAuth is not connected yet. Please sign in with email and password.');
        }}
        className="w-full"
      >
        Continue with GitHub
      </Button>

      <p className="text-center text-xs text-slate-400 mt-4">
        Don't have an AIDevHub account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-purple-400 font-semibold hover:underline inline-flex items-center gap-1"
        >
          Create account <ArrowRight className="w-3 h-3" />
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
