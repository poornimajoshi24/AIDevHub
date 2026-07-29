import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const EmptyState = ({
  icon: Icon,
  title = 'No Data Available',
  description = 'Get started by executing an action or uploading your assets.',
  actionLabel,
  onAction
}) => {
  return (
    <Card hoverEffect={false} className="flex flex-col items-center justify-center p-12 text-center my-6">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 shadow-glow-purple">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

export default EmptyState;
