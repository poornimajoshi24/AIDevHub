import { apiRequest } from './apiClient.js';

const mapAudit = (audit) => {
  if (!audit) return null;

  return {
    id: audit._id || audit.id,
    repoName: audit.repoName,
    url: audit.repoUrl || audit.url,
    stars: audit.stars,
    forks: audit.forks,
    language: audit.language,
    qualityScore: audit.qualityScore,
    securityScore: audit.securityScore,
    maintainability: audit.maintainability,
    testCoverage: audit.testCoverage,
    metrics: audit.metrics,
    fileTree: audit.fileTree || [],
    aiSuggestions: (audit.aiSuggestions || []).map((suggestion, index) => ({
      id: suggestion.id || `s${index + 1}`,
      title: suggestion.title,
      severity: suggestion.severity,
      file: suggestion.file,
      description: suggestion.description,
      codeSnippet: suggestion.codeSnippet,
    })),
    contributions: audit.contributions || [],
  };
};

export const githubAPI = {
  analyzeRepo: async (repoUrl) => {
    if (!repoUrl?.trim()) {
      throw new Error('Please provide a valid GitHub repository URL.');
    }

    const response = await apiRequest('/api/v1/github/audit', {
      method: 'POST',
      body: { repoUrl: repoUrl.trim() },
    });

    return mapAudit(response.data?.audit);
  },

  listAudits: async ({ page = 1, limit = 10, search = '', sort = '-createdAt' } = {}) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sort,
    });
    if (search) params.set('search', search);

    const response = await apiRequest(`/api/v1/github?${params.toString()}`);
    return {
      audits: (response.data?.audits || []).map(mapAudit),
      pagination: response.data?.pagination,
    };
  },
};
