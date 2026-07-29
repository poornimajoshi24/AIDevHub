import { useState } from 'react';
import { resumeAPI } from '../services/resumeAPI';

export const useResume = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);

  const analyzeFile = async (file) => {
    setAnalyzing(true);
    setError(null);
    try {
      const data = await resumeAPI.analyzeResume(file);
      setResumeData(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to analyze resume.');
      throw err;
    } finally {
      setAnalyzing(false);
    }
  };

  return { analyzing, resumeData, error, analyzeFile, setResumeData };
};
