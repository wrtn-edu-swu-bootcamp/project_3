// components/ui/PriorityChip.tsx
interface PriorityChipProps {
  type: 'urgent' | 'consider' | 'good';
  count: number;
}

export function PriorityChip({ type, count }: PriorityChipProps) {
  const config = {
    urgent: {
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495z" clipRule="evenodd" />
        </svg>
      ),
      label: '긴급',
      classes: 'bg-red-500 text-white'
    },
    consider: {
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      ),
      label: '고려',
      classes: 'bg-orange-500 text-white'
    },
    good: {
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
      ),
      label: '잘함',
      classes: 'bg-green-500 text-white'
    }
  };

  const { icon, label, classes } = config[type];

  if (count === 0) return null;

  return (
    <span
      aria-label={`${label} ${count}건`}
      className={`
        inline-flex items-center gap-1.5 
        px-3 py-1.5 
        rounded-full 
        text-xs font-semibold
        shadow-sm
        ${classes}
      `}
    >
      {icon}
      {label} {count}
    </span>
  );
}
