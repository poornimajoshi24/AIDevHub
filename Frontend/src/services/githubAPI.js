// Mock GitHub AI Reviewer Service

export const githubAPI = {
  analyzeRepo: async (repoUrl) => {
    await new Promise(resolve => setTimeout(resolve, 2200));

    const cleanUrl = repoUrl ? repoUrl.trim() : 'https://github.com/alexdev/next-cloud-engine';
    const repoName = cleanUrl.split('/').slice(-2).join('/') || 'alexdev/next-cloud-engine';

    return {
      repoName: repoName,
      url: cleanUrl,
      stars: 1240,
      forks: 184,
      language: 'TypeScript',
      qualityScore: 94,
      securityScore: 98,
      maintainability: 'A+',
      testCoverage: '91.4%',
      metrics: {
        codeQuality: 94,
        architecture: 96,
        security: 98,
        documentation: 85,
        performance: 92
      },
      fileTree: [
        { name: 'src/core/engine.ts', quality: 98, issues: 0, lines: 420 },
        { name: 'src/services/auth.ts', quality: 92, issues: 1, lines: 280, note: 'Consider switching from synchronous JWT verification to async keys rotation' },
        { name: 'src/components/DataGrid.tsx', quality: 84, issues: 3, lines: 610, note: 'High cyclomatic complexity in renderCell() — recommend extracting sub-renderers' },
        { name: 'src/utils/cache.ts', quality: 96, issues: 0, lines: 145 },
        { name: 'server/api/router.go', quality: 95, issues: 0, lines: 310 }
      ],
      aiSuggestions: [
        {
          id: 's1',
          title: 'Optimize React Re-renders in DataGrid',
          severity: 'Medium',
          file: 'src/components/DataGrid.tsx',
          description: 'The `DataGrid` component re-renders 12 extra times during state updates due to un-memoized object literals passed to child cell providers.',
          codeSnippet: `// BEFORE:
<CellFormatter config={{ align: 'left', format: 'currency' }} />

// AFTER (RECOMMENDED):
const cellConfig = useMemo(() => ({ align: 'left', format: 'currency' }), []);
<CellFormatter config={cellConfig} />`
        },
        {
          id: 's2',
          title: 'Implement Memory Bounded LRU Cache Limit',
          severity: 'High',
          file: 'src/utils/cache.ts',
          description: 'Cache store lacks max size memory limit which can lead to heap overflow during high concurrency bursts.',
          codeSnippet: `// RECOMMENDED ADDITION:
if (this.cache.size >= MAX_CACHE_ENTRIES) {
  const oldestKey = this.cache.keys().next().value;
  this.cache.delete(oldestKey);
}`
        }
      ],
      contributions: [
        { day: 'Mon', count: 12 },
        { day: 'Tue', count: 18 },
        { day: 'Wed', count: 24 },
        { day: 'Thu', count: 15 },
        { day: 'Fri', count: 29 },
        { day: 'Sat', count: 8 },
        { day: 'Sun', count: 5 }
      ]
    };
  }
};
