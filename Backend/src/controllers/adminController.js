import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/User.model.js';
import { Resume } from '../models/Resume.model.js';
import { GithubAudit } from '../models/GithubAudit.model.js';

/**
 * GET /api/v1/admin/stats
 * Protected Admin & Staff Architect Only Endpoint
 */
export const getAdminStats = AsyncHandler(async (req, res) => {
  const [totalUsers, totalResumes, totalGithubAudits] = await Promise.all([
    User.countDocuments(),
    Resume.countDocuments(),
    GithubAudit.countDocuments(),
  ]);

  const stats = {
    systemHealth: 'OPERATIONAL',
    metrics: {
      totalUsers,
      totalResumesAnalyzed: totalResumes,
      totalGithubAuditsCompleted: totalGithubAudits,
    },
    requestedBy: {
      id: req.user._id,
      name: req.user.name,
      role: req.user.role,
    },
    timestamp: new Date().toISOString(),
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, 'Admin telemetry stats retrieved successfully.'));
});
