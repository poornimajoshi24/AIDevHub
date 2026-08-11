import mongoose, { Schema } from 'mongoose';

const githubAuditSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    repoName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    repoUrl: {
      type: String,
      required: true,
      trim: true,
    },
    stars: {
      type: Number,
      default: 0,
    },
    forks: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      default: 'TypeScript',
    },
    qualityScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    securityScore: {
      type: Number,
      default: 100,
    },
    maintainability: {
      type: String,
      default: 'A+',
    },
    testCoverage: {
      type: String,
      default: '90%',
    },
    metrics: {
      codeQuality: { type: Number, default: 90 },
      architecture: { type: Number, default: 90 },
      security: { type: Number, default: 95 },
      documentation: { type: Number, default: 85 },
      performance: { type: Number, default: 90 },
    },
    fileTree: [
      {
        name: { type: String, required: true },
        quality: { type: Number, default: 90 },
        issues: { type: Number, default: 0 },
        lines: { type: Number, default: 100 },
        note: { type: String, default: '' },
      },
    ],
    aiSuggestions: [
      {
        title: { type: String, required: true },
        severity: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
        file: { type: String },
        description: { type: String },
        codeSnippet: { type: String },
      },
    ],
    contributions: [
      {
        day: { type: String },
        count: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

githubAuditSchema.index({ user: 1, createdAt: -1 });

export const GithubAudit = mongoose.model('GithubAudit', githubAuditSchema);
