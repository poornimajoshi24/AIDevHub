import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Github, Key, ShieldCheck, Check, Sparkles } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [email, setEmail] = useState(user?.email || 'alex.rivera@meta.com');
  const [githubUser, setGithubUser] = useState(user?.githubUsername || 'alexrivera-dev');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* Header */}
      <PageHeader
        badge={<Badge variant="purple" size="sm">User Account Settings</Badge>}
        title="Developer Profile & AI Subscriptions"
        subtitle="Manage your credentials, connected GitHub repositories, and AI engine preferences."
      />

      {/* Main Profile Card */}
      <Card hoverEffect={false} className="flex flex-col gap-6 p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-white/10 pb-6">
          <Avatar src={user?.avatar} alt={user?.name} size="xl" status="online" />
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{user?.name || 'Alex Rivera'}</h2>
              <Badge variant="purple" size="sm">{user?.tier || 'Pro AI Architect'}</Badge>
            </div>
            <p className="text-xs text-slate-400 font-mono">{user?.email}</p>
            <span className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Enterprise Verified Account
            </span>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Work Email"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Connected GitHub Username"
              icon={Github}
              value={githubUser}
              onChange={(e) => setGithubUser(e.target.value)}
            />
            <Input
              label="Personal Gemini API Key (Optional)"
              type="password"
              icon={Key}
              placeholder="••••••••••••••••••••••••"
              helperText="Leave empty to use shared AIDevHub enterprise tier key."
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {saved ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Profile updated successfully!
              </span>
            ) : (
              <span className="text-xs text-slate-400">Changes apply across all workspace components.</span>
            )}
            <Button type="submit" variant="primary" size="md" icon={Sparkles}>
              Save Preferences
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
