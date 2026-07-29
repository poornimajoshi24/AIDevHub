import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

export const ErrorMessage = ({ title = 'Something went wrong', message, onRetry }) => {
  return (
    <div className="glass-panel border-rose-500/30 bg-rose-950/20 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 my-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-rose-200">{title}</h4>
          {message && <p className="text-xs text-rose-300/80 mt-0.5">{message}</p>}
        </div>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
