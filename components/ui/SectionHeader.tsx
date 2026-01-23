// components/ui/SectionHeader.tsx
interface SectionHeaderProps {
  title: string;
  support?: string;
  withBackground?: boolean;
  cta?: React.ReactNode;
}

export function SectionHeader({ title, support, withBackground = false, cta }: SectionHeaderProps) {
  return (
    <div 
      className={`
        w-full mt-8 mb-4
        ${withBackground ? 'bg-gray-50 p-4 rounded-xl' : ''}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>
          {support && (
            <p className="text-sm text-gray-500 mt-1">
              {support}
            </p>
          )}
        </div>
        {cta && (
          <div className="ml-4 flex-shrink-0">
            {cta}
          </div>
        )}
      </div>
    </div>
  );
}
