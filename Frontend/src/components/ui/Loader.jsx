import React from 'react';
import { Spinner } from './Spinner';

export const Loader = ({ text = 'AI is analyzing your dataset...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-16 h-16 rounded-full bg-purple-500/20 blur-xl animate-pulse" />
        <Spinner size="lg" />
      </div>
      {text && (
        <p className="text-sm font-medium text-slate-300 animate-pulse tracking-wide font-mono">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090e]/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
