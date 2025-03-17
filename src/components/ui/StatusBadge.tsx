import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

export type StatusType = 'delayed' | 'inprogress' | 'completed';

interface StatusBadgeProps {
  status: StatusType;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig = {
  delayed: {
    label: 'Atrasado',
    bg: 'bg-red-100',
    text: 'text-red-700',
    icon: AlertCircle,
    iconClass: 'text-red-700'
  },
  inprogress: {
    label: 'Em Andamento',
    bg: 'bg-cyan-100',
    text: 'text-cyan-700',
    icon: Clock,
    iconClass: 'text-cyan-700'
  },
  completed: {
    label: 'Finalizado',
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    icon: CheckCircle,
    iconClass: 'text-emerald-700'
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  showIcon = true, 
  size = 'md', 
  className 
}) => {
  const config = statusConfig[status];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };
  
  const IconComponent = config.icon;
  
  return (
    <span 
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        config.bg,
        config.text,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <IconComponent className={cn('h-3.5 w-3.5', config.iconClass)} />}
      {config.label}
    </span>
  );
};

export default StatusBadge;
