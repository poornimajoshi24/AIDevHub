import { useState } from 'react';
import { githubAPI } from '../services/githubAPI';

export const useGithub = () => {
  const [reviewing, setReviewing] = useState(false);
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState(null);

  const reviewRepo = async (url) => {
    setReviewing(true);
    setError(null);
    try {
      const data = await githubAPI.analyzeRepo(url);
      setRepoData(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to review repository.');
      throw err;
    } finally {
      setReviewing(false);
    }
  };

  return { reviewing, repoData, error, reviewRepo, setRepoData };
};
