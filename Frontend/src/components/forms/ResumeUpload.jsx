import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const ResumeUpload = ({ onUpload, loading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onUpload?.(file);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onUpload?.(file);
    }
  };

  const handleSampleResume = () => {
    const dummyFile = new File(['Sample Resume'], 'Staff_Fullstack_Engineer_Resume.pdf', { type: 'application/pdf' });
    setSelectedFile(dummyFile);
    onUpload?.(dummyFile);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`glass-panel border-2 border-dashed rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative overflow-hidden group ${
          dragActive
            ? 'border-purple-400 bg-purple-500/10 shadow-glow-purple scale-[1.01]'
            : 'border-white/15 hover:border-purple-500/50 hover:bg-white/[0.02]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleChange}
          className="hidden"
        />

        {/* Ambient Top Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent group-hover:w-full transition-all duration-500" />

        <div className="w-16 h-16 rounded-2xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 shadow-glow-purple group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          {selectedFile ? selectedFile.name : 'Upload Your Resume for AI Analysis'}
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
          Drag & drop your <span className="text-purple-300 font-mono">PDF</span> or <span className="text-cyan-300 font-mono">DOCX</span> resume here. Our Gemini AI will compute ATS score, extract skill gaps, & optimize keywords.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="md" icon={Sparkles} loading={loading}>
            {selectedFile ? 'Re-analyze File' : 'Select Resume File'}
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={FileText}
            onClick={(e) => {
              e.stopPropagation();
              handleSampleResume();
            }}
          >
            Load Demo Sample Resume
          </Button>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500 mt-6">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Privacy Protected</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> ATS Compatibility v3</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Max file size 25MB</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
