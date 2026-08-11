import React from 'react';
import confetti from 'canvas-confetti';
import { PageHeader } from '../components/common/PageHeader';
import { ResumeUpload } from '../components/forms/ResumeUpload';
import { ATSScore } from '../components/resume/ATSScore';
import { ResumeScoreCard } from '../components/resume/ResumeScoreCard';
import { ResumeTips } from '../components/resume/ResumeTips';
import { SkillGap } from '../components/resume/SkillGap';
import { Loader } from '../components/ui/Loader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useResume } from '../hooks/useResume';
import { Download } from 'lucide-react';

export const ResumeAnalyzer = () => {
  const { analyzing, resumeData, analyzeFile, error } = useResume();

  const handleUpload = async (file) => {
    try {
      const data = await analyzeFile(file);
      if (data?.overallScore > 85) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch {
      // Error surfaced via useResume().error
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <PageHeader
        badge={<Badge variant="purple" size="sm">AI Resume Intelligence</Badge>}
        title="Resume & ATS Score Optimizer"
        subtitle="Upload your résumé to calculate ATS compatibility, discover skill gaps, and get AI-rewritten impact bullets."
        action={
          resumeData && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="md"
                icon={Download}
                onClick={() => {
                  alert('Downloading AI Optimized Resume PDF report...');
                }}
              >
                Export PDF Report
              </Button>
            </div>
          )
        }
      />

      {/* Upload Zone */}
      <ResumeUpload onUpload={handleUpload} loading={analyzing} />

      {error && <ErrorMessage title="Resume Analysis Error" message={error} />}

      {/* Loading Overlay state */}
      {analyzing ? (
        <Loader text="Gemini AI is parsing resume structure, calculating ATS keywords, & generating recommendations..." />
      ) : resumeData ? (
        <div className="flex flex-col gap-8 animate-fadeIn">
          
          {/* Top Row: ATS Score Ring & Detailed Dimensions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ATSScore scoreData={resumeData.atsScore} />
            </div>
            <div className="lg:col-span-2">
              <ResumeScoreCard breakdown={resumeData.breakdown} />
            </div>
          </div>

          {/* Bottom Row: AI Tips & Skill Gap Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ResumeTips tips={resumeData.tips} />
            <SkillGap detectedSkills={resumeData.detectedSkills} skillGaps={resumeData.skillGaps} />
          </div>

        </div>
      ) : null}
    </div>
  );
};

export default ResumeAnalyzer;
