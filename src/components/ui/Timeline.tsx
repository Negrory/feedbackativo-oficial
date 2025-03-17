import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export interface TimelineItem {
  id: string;
  date: Date;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  images?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {items.map((item, index) => {
        const isExpanded = expandedItems.has(item.id);
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.id} className="relative">
            {/* Timeline connector line */}
            {!isLast && (
              <div 
                className={cn(
                  "absolute left-[18px] top-7 bottom-0 w-[2px]",
                  item.status === 'upcoming' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-primary'
                )}
              />
            )}
            
            <div className="flex gap-4">
              {/* Timeline node */}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 flex items-center justify-center">
                {item.status === 'completed' ? (
                  <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                ) : item.status === 'current' ? (
                  <div className="h-9 w-9 rounded-full border-2 border-primary bg-white dark:bg-gray-800 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary animate-pulse-subtle" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full border-2 border-gray-200 dark:border-gray-700" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-grow">
                <div 
                  className={cn(
                    "flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm cursor-pointer border transition-all",
                    item.status === 'completed' 
                      ? 'border-primary/30' 
                      : item.status === 'current'
                        ? 'border-primary shadow-md'
                        : 'border-gray-200 dark:border-gray-700',
                    isExpanded && 'border-primary/50 dark:border-primary/30'
                  )}
                  onClick={() => toggleItem(item.id)}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{item.title}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {format(item.date, 'dd/MM/yyyy HH:mm')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Expand/collapse icon */}
                  <div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Expanded content */}
                {isExpanded && (
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 animate-slide-down">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {item.description}
                    </p>
                    
                    {/* Images grid */}
                    {item.images && item.images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                        {item.images.map((image, idx) => (
                          <div 
                            key={idx} 
                            className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden"
                          >
                            <img 
                              src={image} 
                              alt={`Imagem ${idx + 1}`} 
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
