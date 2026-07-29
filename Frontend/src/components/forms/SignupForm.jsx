import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../common/ErrorMessage';
import { Mail, Lock, User, UserPlus, Github, ArrowLeft } from 'lucide-react';

export const SignupForm = ({ onSwitchToLogin }) => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {error && <ErrorMessage title="Registration Error" message={error} />}

      <Input
        label="Full Name"
        type="text"
        icon={User}
        placeholder="Alex Rivera"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Input
        label="Work Email"
        type="email"
        icon={Mail}
        placeholder="alex@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        icon={Lock}
        placeholder="At least 8 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="text-xs text-slate-400 leading-relaxed">
        By signing up, you agree to AIDevHub's{' '}
        <a href="#terms" className="text-purple-400 hover:underline">Terms of Service</a> and{' '}
        <a href="#privacy" className="text-purple-400 hover:underline">Privacy Policy</a>.
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        icon={UserPlus}
        loading={loading}
        className="w-full mt-2"
      >
        Create Free AI Account
      </Button>

      <p className="text-center text-xs text-slate-400 mt-4">
        Already registered?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-purple-400 font-semibold hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" /> Sign in here
        </button>
      </p>
    </form>
  );
};

export default SignupForm;
