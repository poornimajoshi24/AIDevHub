import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { RepoCard } from '../components/github/RepoCard';
import { ContributionChart } from '../components/github/ContributionChart';
import { RepoList } from '../components/github/RepoList';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Loader } from '../components/ui/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useGithub } from '../hooks/useGithub';
import { Github, Sparkles, Code, Check, Copy, Terminal } from 'lucide-react';

export const GitHubReviewer = () => {
  const { reviewing, repoData, reviewRepo, error } = useGithub();
  const [urlInput, setUrlInput] = useState('https://github.com/alexdev/next-cloud-engine');
  const [copiedId, setCopiedId] = useState(null);

  const handleAudit = async (e) => {
    e?.preventDefault();
    if (!urlInput.trim()) return;
    try {
      await reviewRepo(urlInput.trim());
    } catch {
      // Error surfaced via useGithub().error
    }
  };

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <PageHeader
        badge={<Badge variant="cyan" size="sm">AI Code Quality Auditor</Badge>}
        title="GitHub Project & Code Reviewer"
        subtitle="Provide your GitHub repository link to inspect code quality, architecture patterns, test coverage, and automated PR refactorings."
      />

      {/* Repository Input Section */}
      <form onSubmit={handleAudit} className="glass-panel p-4 md:p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-4">
        <div className="w-full">
          <Input
            icon={Github}
            placeholder="https://github.com/username/repository"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={Sparkles}
          loading={reviewing}
          className="shrink-0 w-full md:w-auto shadow-glow-cyan"
        >
          Analyze Repository Code
        </Button>
      </form>

      {error && <ErrorMessage title="GitHub Audit Error" message={error} />}

      {/* Loading state */}
      {reviewing ? (
        <Loader text="Gemini AI is parsing AST trees, inspecting cyclomatic complexity, & checking security advisories..." />
      ) : repoData ? (
        <div className="flex flex-col gap-8 animate-fadeIn">
          
          {/* Main Repo Score Highlight & Velocity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RepoCard repoData={repoData} />
            </div>
            <div className="lg:col-span-1">
              <ContributionChart contributions={repoData.contributions} />
            </div>
          </div>

          {/* AI Refactoring Suggestions */}
          <Card hoverEffect={false} className="w-full flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">AI Suggested Refactoring Pull Requests</h3>
              </div>
              <Badge variant="cyan" size="sm">
                {repoData.aiSuggestions.length} Recommendations
              </Badge>
            </div>

            <div className="flex flex-col gap-6">
              {repoData.aiSuggestions.map((sug) => (
                <div key={sug.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Code className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{sug.title}</h4>
                        <p className="text-xs text-purple-300 font-mono">{sug.file}</p>
                      </div>
                    </div>
                    <Badge variant={sug.severity === 'High' ? 'rose' : 'amber'} size="sm">
                      {sug.severity} Priority
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{sug.description}</p>

                  {/* Diff Snippet */}
                  <div className="rounded-xl bg-[#05070a] border border-white/10 overflow-hidden font-mono text-xs">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/10 text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-purple-400" /> Refactoring Diff
                      </span>
                      <button
                        onClick={() => handleCopyCode(sug.id, sug.codeSnippet)}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        {copiedId === sug.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === sug.id ? 'Copied' : 'Copy Fix'}</span>
                      </button>
                    </div>
                    <pre className="p-4 text-cyan-200 overflow-x-auto">
                      <code>{sug.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* File Quality Tree Breakdown & Recent Audits */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card hoverEffect={false} className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-400" /> File Quality & Issues Inspection
                </h3>
                <span className="text-xs text-slate-400">5 Critical Files Analyzed</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {repoData.fileTree.map((f, idx) => (
                  <div key={idx} className="glass-panel p-3.5 rounded-xl border border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5 text-slate-300 font-mono text-xs">
                        {f.lines} lines
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white font-mono">{f.name}</p>
                        {f.note && <p className="text-[11px] text-amber-300/80 mt-0.5">{f.note}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant={f.quality > 90 ? 'emerald' : 'amber'} size="sm">
                        Quality: {f.quality}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="lg:col-span-1">
              <RepoList onSelectRepo={(url) => {
                setUrlInput(url);
                reviewRepo(url);
              }} />
            </div>
          </div>

        </div>
      ) : null}
    </div>
  );
};

export default GitHubReviewer;
