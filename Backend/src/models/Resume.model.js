import mongoose, { Schema } from 'mongoose';

const resumeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      default: '',
    },
    overallScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    atsScore: {
      score: { type: Number, default: 0 },
      grade: { type: String, default: 'B' },
      status: { type: String, default: 'Analyzed' },
      keywordsFound: [{ type: String }],
      keywordsMissing: [{ type: String }],
    },
    breakdown: {
      impact: { type: Number, default: 0 },
      formatting: { type: Number, default: 0 },
      relevance: { type: Number, default: 0 },
      brevity: { type: Number, default: 0 },
    },
    detectedSkills: [{ type: String }],
    skillGaps: [
      {
        skill: { type: String },
        priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
        demand: { type: String },
      },
    ],
    tips: [
      {
        category: { type: String },
        type: { type: String, enum: ['critical', 'warning', 'suggestion'], default: 'warning' },
        text: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound index for querying user's latest resumes efficiently
resumeSchema.index({ user: 1, createdAt: -1 });

export const Resume = mongoose.model('Resume', resumeSchema);
