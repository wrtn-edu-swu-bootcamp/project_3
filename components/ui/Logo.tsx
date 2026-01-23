// components/ui/Logo.tsx
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function Logo({ size = 'md', showIcon = true }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center gap-1">
      {showIcon && (
        <div className={`
          w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 
          flex items-center justify-center text-white font-bold text-sm
          shadow-sm
        `}>
          R
        </div>
      )}
      <span className={`font-bold tracking-tight ${sizeClasses[size]}`}>
        <span className="text-gray-900">RE</span>
        <span className="text-blue-500">:</span>
        <span className="text-gray-900">ACTION</span>
      </span>
    </div>
  );
}
