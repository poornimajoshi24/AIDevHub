import { apiRequest } from './apiClient.js';

const mapResume = (resume) => {
  if (!resume) return null;

  return {
    id: resume._id || resume.id,
    fileName: resume.fileName,
    fileUrl: resume.fileUrl,
    parsedAt: resume.createdAt
      ? new Date(resume.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    overallScore: resume.overallScore,
    atsScore: resume.atsScore,
    breakdown: resume.breakdown,
    detectedSkills: resume.detectedSkills || [],
    skillGaps: resume.skillGaps || [],
    tips: (resume.tips || []).map((tip, index) => ({
      id: tip.id || index + 1,
      category: tip.category,
      type: tip.type,
      text: tip.text,
    })),
  };
};

export const resumeAPI = {
  analyzeResume: async (file) => {
    if (!file) {
      throw new Error('Please upload a resume file to analyze.');
    }

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('fileName', file.name);

    const response = await apiRequest('/api/v1/resumes/upload', {
      method: 'POST',
      body: formData,
    });

    return mapResume(response.data?.resume);
  },

  listResumes: async ({ page = 1, limit = 10, search = '', sort = '-createdAt' } = {}) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sort,
    });
    if (search) params.set('search', search);

    const response = await apiRequest(`/api/v1/resumes?${params.toString()}`);
    return {
      resumes: (response.data?.resumes || []).map(mapResume),
      pagination: response.data?.pagination,
    };
  },
};
